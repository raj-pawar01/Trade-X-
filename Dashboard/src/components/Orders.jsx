import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/allOrders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setError("Could not load orders.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
        <p style={{ color: "#999" }}>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Avg. price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              // Convert MongoDB ObjectId to timestamp (or mock it since we don't store timestamp in schema)
              const timestamp = new Date(parseInt(order._id.substring(0, 8), 16) * 1000);
              const timeStr = timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
              const isBuy = order.mode.toUpperCase() === "BUY";
              
              return (
                <tr key={index}>
                  <td style={{ color: "#999", fontSize: "0.8rem" }}>{timeStr}</td>
                  <td>{order.name}</td>
                  <td style={{ color: isBuy ? "#4184f3" : "#ff5722", fontWeight: "600", fontSize: "0.8rem" }}>
                    {order.mode.toUpperCase()}
                  </td>
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        padding: "2px 6px",
                        borderRadius: "2px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      COMPLETE
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
