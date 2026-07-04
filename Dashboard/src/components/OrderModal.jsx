import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderModal = ({ isOpen, onClose, stock, initialMode = "BUY" }) => {
  const [mode, setMode] = useState(initialMode);
  const [orderType, setOrderType] = useState("MARKET"); // MARKET or LIMIT
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock ? stock.price.toFixed(2) : "0.00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (stock) {
      setMode(initialMode);
      setQty(1);
      setPrice(stock.price.toFixed(2));
      setError("");
      setSuccess(false);
    }
  }, [stock, initialMode, isOpen]);

  useEffect(() => {
    if (orderType === "MARKET" && stock) {
      setPrice(stock.price.toFixed(2));
    }
  }, [orderType, stock]);

  if (!isOpen || !stock) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (qty <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("http://localhost:8080/newOrder", {
        name: stock.name,
        qty: Number(qty),
        price: Number(price),
        mode: mode.toUpperCase(),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload(); // Reload to refresh holdings and positions
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalValue = (Number(qty) * Number(price)).toFixed(2);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          backgroundColor: "white",
          borderRadius: "6px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Header banner */}
        <div
          style={{
            backgroundColor: mode === "BUY" ? "#4184f3" : "#ff5722",
            color: "white",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: "600", letterSpacing: "1px" }}>
              {mode} {stock.name}
            </span>
            <span style={{ marginLeft: "10px", fontSize: "0.85rem", opacity: 0.9 }}>
              LTP ₹{stock.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          {success ? (
            <div
              style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: "15px",
                borderRadius: "4px",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "0.95rem",
              }}
            >
              Order executed successfully!
            </div>
          ) : (
            <>
              {error && (
                <div
                  style={{
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    padding: "10px",
                    borderRadius: "4px",
                    textAlign: "center",
                    marginBottom: "15px",
                    fontSize: "0.85rem",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Mode switch */}
              <div style={{ display: "flex", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "4px", overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={() => setMode("BUY")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    backgroundColor: mode === "BUY" ? "#4184f3" : "#f5f5f5",
                    color: mode === "BUY" ? "white" : "#666",
                  }}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setMode("SELL")}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    backgroundColor: mode === "SELL" ? "#ff5722" : "#f5f5f5",
                    color: mode === "SELL" ? "white" : "#666",
                  }}
                >
                  SELL
                </button>
              </div>

              {/* Order Types */}
              <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                <label style={{ fontSize: "0.85rem", color: "#666", display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="orderType"
                    value="MARKET"
                    checked={orderType === "MARKET"}
                    onChange={() => setOrderType("MARKET")}
                    style={{ marginRight: "6px" }}
                  />
                  Market
                </label>
                <label style={{ fontSize: "0.85rem", color: "#666", display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="orderType"
                    value="LIMIT"
                    checked={orderType === "LIMIT"}
                    onChange={() => setOrderType("LIMIT")}
                    style={{ marginRight: "6px" }}
                  />
                  Limit
                </label>
              </div>

              {/* Inputs */}
              <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px" }}>Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#666", marginBottom: "6px" }}>Price (₹)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.05"
                    disabled={orderType === "MARKET"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                      backgroundColor: orderType === "MARKET" ? "#f5f5f5" : "white",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Summary */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem",
                  color: "#666",
                  borderTop: "1px dashed #ddd",
                  paddingTop: "12px",
                  marginBottom: "20px",
                }}
              >
                <span>Margin Required</span>
                <span style={{ fontWeight: "600", color: "#333" }}>₹{totalValue}</span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: mode === "BUY" ? "#4184f3" : "#ff5722",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  {loading ? "Processing..." : mode}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
