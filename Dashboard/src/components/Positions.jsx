import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStockPrices } from "./StockPricesContext";
import OrderModal from "./OrderModal";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // OrderModal states
  const [selectedStock, setSelectedStock] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState("BUY");

  const { getLiveStock } = useStockPrices();

  useEffect(() => {
    // Add auth header if present in localstorage to match user auth flows
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    
    axios
      .get("http://localhost:8080/allPositions", config)
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch positions:", err);
        setError("Could not load positions.");
      });
  }, []);

  // Compute live positions values
  let totalInvestment = 0;
  let totalCurrentValue = 0;

  const positionsWithLiveData = allPositions.map((stock) => {
    const liveInfo = getLiveStock(stock.name);
    const liveLTP = liveInfo.price > 0 ? liveInfo.price : stock.price;
    const curValue = liveLTP * stock.qty;
    const investment = stock.avg * stock.qty;

    totalInvestment += investment;
    totalCurrentValue += curValue;

    const pl = curValue - investment;
    const isProfit = pl >= 0.0;

    return {
      ...stock,
      price: liveLTP,
      curValue,
      pl,
      isProfit,
      day: liveInfo.percent || stock.day,
      isLoss: liveInfo.isDown !== undefined ? liveInfo.isDown : stock.isLoss,
    };
  });

  const totalPL = totalCurrentValue - totalInvestment;
  const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;
  const isTotalProfit = totalPL >= 0;

  const filteredPositions = positionsWithLiveData.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (stock) => {
    setSelectedStock({ name: stock.name, price: stock.price });
    setOrderMode("BUY");
    setIsOrderModalOpen(true);
  };

  const handleExit = (stock) => {
    setSelectedStock({ name: stock.name, price: stock.price });
    setOrderMode("SELL");
    setIsOrderModalOpen(true);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 className="title" style={{ margin: 0 }}>Positions ({filteredPositions.length})</h3>
        <input
          type="text"
          placeholder="Search instrument..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.85rem",
            width: "200px",
            outline: "none"
          }}
        />
      </div>

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

      {filteredPositions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#999", border: "1px dashed #eee", borderRadius: "4px" }}>
          No active positions found. Buy stocks from the watchlist to create new positions!
        </div>
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg.</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Chg.</th>
                </tr>
              </thead>

              <tbody>
                {filteredPositions.map((stock, index) => {
                  const profClass = stock.isProfit ? "profit" : "loss";
                  const dayClass = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index} className="pos-row">
                      <td>{stock.product}</td>
                      <td>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 500 }}>{stock.name}</span>
                          <span className="pos-actions">
                            <button 
                              onClick={() => handleAdd(stock)}
                              style={{
                                padding: "2px 6px",
                                backgroundColor: "#4184f3",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                fontSize: "0.7rem",
                                cursor: "pointer",
                                marginRight: "4px",
                                fontWeight: "600"
                              }}
                            >
                              ADD
                            </button>
                            <button 
                              onClick={() => handleExit(stock)}
                              style={{
                                padding: "2px 6px",
                                backgroundColor: "#ff5722",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                fontSize: "0.7rem",
                                cursor: "pointer",
                                fontWeight: "600"
                              }}
                            >
                              EXIT
                            </button>
                          </span>
                        </div>
                      </td>
                      <td>{stock.qty}</td>
                      <td>{stock.avg.toFixed(2)}</td>
                      <td>{stock.price.toFixed(2)}</td>
                      <td className={profClass}>{stock.pl.toFixed(2)}</td>
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
              <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>Total Investment</p>
            </div>
            <div className="col" style={{ flex: 1, backgroundColor: "#fafafa", padding: "20px", borderRadius: "4px", border: "1px solid #eee" }}>
              <h5 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600", color: "#333" }}>
                {totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h5>
              <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>Current Value</p>
            </div>
            <div className="col" style={{ flex: 1, backgroundColor: "#fafafa", padding: "20px", borderRadius: "4px", border: "1px solid #eee" }}>
              <h5 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "600", color: isTotalProfit ? "#4caf50" : "#ff5722" }}>
                {totalPL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalPLPercent >= 0 ? "+" : ""}{totalPLPercent.toFixed(2)}%)
              </h5>
              <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999" }}>Total P&L</p>
            </div>
          </div>
        </>
      )}

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        stock={selectedStock}
        initialMode={orderMode}
      />
    </>
  );
};

export default Positions;
