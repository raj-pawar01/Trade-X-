import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import { StockPricesProvider } from "./StockPricesContext";

const Home = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    const usernameParam = queryParams.get("username");

    let token = localStorage.getItem("token");

    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      if (usernameParam) {
        localStorage.setItem("username", usernameParam);
      }
      token = tokenParam;
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (!token) {
      window.location.href = "http://localhost:3000/login";
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" }}>
        <h4 style={{ color: "#666", fontWeight: "normal" }}>Redirecting to login...</h4>
      </div>
    );
  }

  return (
    <StockPricesProvider>
      <TopBar />
      <Dashboard />
    </StockPricesProvider>
  );
};

export default Home;
