import React, { useState, useEffect } from "react";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(100000.0);
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const displayFunds = typeof funds === "number" && !isNaN(funds) ? funds : 0.00;
  const displayTransactions = Array.isArray(transactions) ? transactions : [];

  const token = localStorage.getItem("token");
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const fetchFunds = () => {
    axios
      .get("http://localhost:8080/userFunds", config)
      .then((res) => {
        setFunds(res.data.funds);
      })
      .catch((err) => {
        console.error("Failed to fetch funds:", err);
        setError("Could not load funds details.");
      });
  };

  const fetchTransactions = () => {
    axios
      .get("http://localhost:8080/allTransactions", config)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setError("Could not load transaction details.");
      });
  };

  useEffect(() => {
    fetchFunds();
    fetchTransactions();
  }, []);

  const handleAddFunds = async (e) => {
    e.preventDefault();
    const amount = Number(addAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setError("");
      setSuccess("");
      const res = await axios.post("http://localhost:8080/addFunds", { amount }, config);
      setFunds(res.data.funds);
      
      fetchTransactions();
      
      setSuccess(`Successfully added ₹${amount.toLocaleString("en-IN")}`);
      setAddAmount("");
      setIsAddOpen(false);
      
      // Auto-clear success message
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add funds.");
    }
  };

  const handleWithdrawFunds = async (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setError("");
      setSuccess("");
      const res = await axios.post("http://localhost:8080/withdrawFunds", { amount }, config);
      setFunds(res.data.funds);

      fetchTransactions();

      setSuccess(`Successfully withdrew ₹${amount.toLocaleString("en-IN")}`);
      setWithdrawAmount("");
      setIsWithdrawOpen(false);

      // Auto-clear success message
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to withdraw funds.");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "300", color: "#444" }}>Funds</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => { setError(""); setSuccess(""); setIsAddOpen(true); }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "3px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.85rem",
              transition: "background-color 0.2s"
            }}
          >
            Add funds
          </button>
          <button 
            onClick={() => { setError(""); setSuccess(""); setIsWithdrawOpen(true); }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4184f3",
              color: "white",
              border: "none",
              borderRadius: "3px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.85rem",
              transition: "background-color 0.2s"
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "12px", borderRadius: "4px", marginBottom: "20px", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "12px", borderRadius: "4px", marginBottom: "20px", fontSize: "0.9rem", fontWeight: "500" }}>
          {success}
        </div>
      )}

      <div style={{ display: "flex", gap: "30px", marginBottom: "35px" }}>
        {/* Equity Card */}
        <div style={{ flex: 1, border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ backgroundColor: "#fbfbfb", padding: "15px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "600", color: "#444", fontSize: "0.9rem" }}>Equity</span>
            <span style={{ fontSize: "0.75rem", color: "#888", backgroundColor: "#e8f0fe", padding: "2px 6px", borderRadius: "3px", color: "#4184f3", fontWeight: "600" }}>NSE / BSE</span>
          </div>
          <div style={{ padding: "25px 20px" }}>
            <div style={{ marginBottom: "25px" }}>
              <h2 style={{ margin: 0, fontSize: "2.4rem", fontWeight: "300", color: "#4184f3" }}>
                ₹{displayFunds.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Available Margin (Cash)</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "#555" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Opening balance</span>
                <span style={{ fontWeight: "500" }}>₹{displayFunds.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Used margin</span>
                <span style={{ fontWeight: "500", color: "#ff5722" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Payin</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Payout</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#999" }}>Collateral (Liquid)</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commodity Card */}
        <div style={{ flex: 1, border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ backgroundColor: "#fbfbfb", padding: "15px 20px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "600", color: "#444", fontSize: "0.9rem" }}>Commodity</span>
            <span style={{ fontSize: "0.75rem", color: "#888", backgroundColor: "#fff3e0", padding: "2px 6px", borderRadius: "3px", color: "#ff9800", fontWeight: "600" }}>MCX</span>
          </div>
          <div style={{ padding: "25px 20px" }}>
            <div style={{ marginBottom: "25px" }}>
              <h2 style={{ margin: 0, fontSize: "2.4rem", fontWeight: "300", color: "#ff9800" }}>
                ₹0.00
              </h2>
              <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>Available Margin</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem", color: "#555" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Opening balance</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Used margin</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Payin</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #f6f6f6", paddingBottom: "8px" }}>
                <span style={{ color: "#999" }}>Payout</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#999" }}>Collateral (Liquid)</span>
                <span style={{ fontWeight: "500" }}>₹0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h4 style={{ margin: "0 0 15px", fontSize: "1.1rem", color: "#444", fontWeight: "400" }}>Transaction History</h4>
        <div style={{ border: "1px solid #eee", borderRadius: "6px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#fbfbfb", borderBottom: "1px solid #eee", color: "#999" }}>
                <th style={{ padding: "12px 20px", fontWeight: "500" }}>Date & Time</th>
                <th style={{ padding: "12px 20px", fontWeight: "500" }}>Type</th>
                <th style={{ padding: "12px 20px", fontWeight: "500", textAlign: "right" }}>Amount</th>
                <th style={{ padding: "12px 20px", fontWeight: "500", textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayTransactions.map((tx, idx) => {
                const txAmount = typeof tx.amount === "number" && !isNaN(tx.amount) ? tx.amount : Number(tx.amount) || 0;
                return (
                  <tr key={tx.id || idx} style={{ borderBottom: "1px solid #f6f6f6" }}>
                    <td style={{ padding: "12px 20px", color: "#666" }}>{tx.date || ""}</td>
                    <td style={{ padding: "12px 20px", fontWeight: "600", color: tx.type === "DEPOSIT" ? "#4caf50" : "#ff5722" }}>
                      {tx.type || ""}
                    </td>
                    <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: "600", color: "#333" }}>
                      ₹{txAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px 20px", textAlign: "center" }}>
                      <span style={{ backgroundColor: "#e8f5e9", color: "#2e7d32", padding: "2px 8px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>
                        {tx.status || "SUCCESS"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Funds Modal */}
      {isAddOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ width: "350px", backgroundColor: "white", borderRadius: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#4caf50", color: "white", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "600" }}>Add Funds (Equity)</span>
              <button onClick={() => setIsAddOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "1.2rem", cursor: "pointer" }}>&times;</button>
            </div>
            <form onSubmit={handleAddFunds} style={{ padding: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px" }}>Deposit Amount (₹)</label>
                <input 
                  type="number"
                  placeholder="Enter amount (e.g. 5000)"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", boxSizing: "border-box", fontSize: "0.95rem" }}
                  required
                  min="1"
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => setIsAddOpen(false)} style={{ flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "white", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "10px", border: "none", borderRadius: "4px", backgroundColor: "#4caf50", color: "white", fontWeight: "600", cursor: "pointer" }}>Deposit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {isWithdrawOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ width: "350px", backgroundColor: "white", borderRadius: "6px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", overflow: "hidden" }}>
            <div style={{ backgroundColor: "#4184f3", color: "white", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "600" }}>Withdraw Funds</span>
              <button onClick={() => setIsWithdrawOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "1.2rem", cursor: "pointer" }}>&times;</button>
            </div>
            <form onSubmit={handleWithdrawFunds} style={{ padding: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px" }}>Withdrawal Amount (₹)</label>
                <input 
                  type="number"
                  placeholder="Enter amount (e.g. 2000)"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px", boxSizing: "border-box", fontSize: "0.95rem" }}
                  required
                  min="1"
                  max={displayFunds}
                />
                <span style={{ fontSize: "0.75rem", color: "#888", display: "block", marginTop: "5px" }}>Max withdrawable: ₹{displayFunds.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="button" onClick={() => setIsWithdrawOpen(false)} style={{ flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "white", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "10px", border: "none", borderRadius: "4px", backgroundColor: "#4184f3", color: "white", fontWeight: "600", cursor: "pointer" }}>Withdraw</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
