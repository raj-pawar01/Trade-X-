import React from "react";
import { useStockPrices } from "./StockPricesContext";
import Menu from "./Menu";

const TopBar = () => {
  const { getLiveStock } = useStockPrices();

  // Retrieve dynamic prices and percentages
  const nifty = getLiveStock("NSEI");
  const sensex = getLiveStock("BSESN");

  return (
    <>
      <div className="topbar-container">
        <div className="indices-container">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points" style={{ color: nifty.isDown ? "rgb(223, 73, 73)" : "rgb(72, 194, 55)", fontWeight: "600" }}>
              {nifty.price > 0 ? nifty.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "24,157.95"}
            </p>
            <p className="percent" style={{ color: nifty.isDown ? "rgb(223, 73, 73)" : "rgb(72, 194, 55)", fontSize: "0.75rem", fontWeight: "600" }}>
              {nifty.price > 0 ? nifty.percent : "+0.00%"}
            </p>
          </div>
          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points" style={{ color: sensex.isDown ? "rgb(223, 73, 73)" : "rgb(72, 194, 55)", fontWeight: "600" }}>
              {sensex.price > 0 ? sensex.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "79,400.12"}
            </p>
            <p className="percent" style={{ color: sensex.isDown ? "rgb(223, 73, 73)" : "rgb(72, 194, 55)", fontSize: "0.75rem", fontWeight: "600" }}>
              {sensex.price > 0 ? sensex.percent : "+0.00%"}
            </p>
          </div>
        </div>
        <Menu />
      </div>
    </>
  );
};

export default TopBar;
