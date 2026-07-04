import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStockPrices } from "./StockPricesContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState("");
  const { getLiveStock } = useStockPrices();

  useEffect(() => {
    axios
      .get("http://localhost:8080/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch holdings:", err);
        setError("Could not load holdings.");
      });
  }, []);

  // Compute live holding calculations
  let totalInvestment = 0;
  let totalCurrentValue = 0;

  const holdingsWithLiveData = allHoldings.map((stock) => {
    const liveInfo = getLiveStock(stock.name);
    // Use live price if available, otherwise fallback to database price
    const liveLTP = liveInfo.price > 0 ? liveInfo.price : stock.price;
    const curValue = liveLTP * stock.qty;
    const investment = stock.avg * stock.qty;

    totalInvestment += investment;
    totalCurrentValue += curValue;

    const pl = curValue - investment;
    const isProfit = pl >= 0.0;
    const netChg = ((liveLTP - stock.avg) / stock.avg) * 100;

    return {
      ...stock,
      price: liveLTP,
      curValue,
      pl,
      isProfit,
      net: `${netChg >= 0 ? "+" : ""}${netChg.toFixed(2)}%`,
      day: liveInfo.percent || stock.day,
      isLoss: liveInfo.isDown !== undefined ? liveInfo.isDown : stock.isLoss,
    };
  });

  const totalPL = totalCurrentValue - totalInvestment;
  const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;
  const isTotalProfit = totalPL >= 0;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdingsWithLiveData.map((stock, index) => {
              const profClass = stock.isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{stock.curValue.toFixed(2)}</td>
                  <td className={profClass}>{stock.pl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row" style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div className="col" style={{ flex: 1, backgroundColor: "#fafafa", padding: "20px", borderRadius: "4px", border: "1px solid #eee" }}>
          <h5 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600", color: "#333" }}>
            {totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>Total investment</p>
        </div>
        <div className="col" style={{ flex: 1, backgroundColor: "#fafafa", padding: "20px", borderRadius: "4px", border: "1px solid #eee" }}>
          <h5 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600", color: "#333" }}>
            {totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>Current value</p>
        </div>
        <div className="col" style={{ flex: 1, backgroundColor: "#fafafa", padding: "20px", borderRadius: "4px", border: "1px solid #eee" }}>
          <h5 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600", color: isTotalProfit ? "#4caf50" : "#ff5722" }}>
            {totalPL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalPLPercent >= 0 ? "+" : ""}{totalPLPercent.toFixed(2)}%)
          </h5>
          <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
