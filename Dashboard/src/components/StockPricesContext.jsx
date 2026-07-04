import React, { createContext, useState, useEffect, useContext } from "react";
import { watchlist as initialWatchlist } from "../data/data";

const StockPricesContext = createContext();

export const useStockPrices = () => useContext(StockPricesContext);

export const StockPricesProvider = ({ children }) => {
  // Store dynamic state for all stocks
  const [stocks, setStocks] = useState(() => {
    const initialMap = {};
    initialWatchlist.forEach((s) => {
      initialMap[s.name] = {
        name: s.name,
        basePrice: s.price,
        price: s.price,
        percent: s.percent,
        isDown: s.isDown,
        prevPrice: s.price,
        lastTickDir: "", // "up" or "down" to trigger CSS flash animations
      };
    });
    return initialMap;
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/live-prices");
        if (response.ok) {
          const apiData = await response.json();
          setStocks((prevStocks) => {
            const updated = { ...prevStocks };
            Object.keys(apiData).forEach((key) => {
              const apiInfo = apiData[key];
              const name = apiInfo.symbol.toUpperCase();
              const prevPrice = updated[name]?.price || apiInfo.price;
              const nextPrice = apiInfo.price;
              
              let lastTickDir = "";
              if (nextPrice > prevPrice) {
                lastTickDir = "up";
              } else if (nextPrice < prevPrice) {
                lastTickDir = "down";
              }
              
              updated[name] = {
                name,
                price: nextPrice,
                percent: `${apiInfo.changePercent >= 0 ? "+" : ""}${apiInfo.changePercent.toFixed(2)}%`,
                isDown: apiInfo.isDown,
                prevPrice,
                lastTickDir,
                basePrice: updated[name]?.basePrice || nextPrice,
              };
            });
            return updated;
          });
        }
      } catch (err) {
        console.error("Failed to fetch live prices from backend:", err);
      }
    };

    fetchPrices();

    const apiInterval = setInterval(fetchPrices, 10000);

    const tickInterval = setInterval(() => {
      setStocks((prevStocks) => {
        const updated = { ...prevStocks };
        Object.keys(updated).forEach((name) => {
          const stock = updated[name];
          const changePercent = (Math.random() * 0.1 - 0.05) / 100;
          const prevPrice = stock.price;
          const nextPrice = Math.max(0.1, prevPrice * (1 + changePercent));

          let lastTickDir = "";
          if (nextPrice > prevPrice) {
            lastTickDir = "up";
          } else if (nextPrice < prevPrice) {
            lastTickDir = "down";
          }

          updated[name] = {
            ...stock,
            price: nextPrice,
            prevPrice,
            lastTickDir,
          };
        });
        return updated;
      });
    }, 3000);

    return () => {
      clearInterval(apiInterval);
      clearInterval(tickInterval);
    };
  }, []);

  const getWatchlist = () => {
    return initialWatchlist.map((s) => {
      const live = stocks[s.name];
      return live ? { name: s.name, price: live.price, percent: live.percent, isDown: live.isDown, lastTickDir: live.lastTickDir } : s;
    });
  };

  const getLiveStock = (name) => {
    return stocks[name.toUpperCase()] || {
      name,
      price: 0,
      percent: "0.00%",
      isDown: false,
      prevPrice: 0,
      lastTickDir: "",
    };
  };

  return (
    <StockPricesContext.Provider
      value={{
        stocks,
        watchlistStocks: getWatchlist(),
        getLiveStock,
      }}
    >
      {children}
    </StockPricesContext.Provider>
  );
};
