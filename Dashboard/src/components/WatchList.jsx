import React, { useState } from "react";
import { useStockPrices } from "./StockPricesContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import OrderModal from "./OrderModal";
import AnalyticsModal from "./AnalyticsModal";

const WatchList = () => {
  const { watchlistStocks } = useStockPrices();
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [selectedStock, setSelectedStock] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderMode, setOrderMode] = useState("BUY");
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  const handleBuy = (stock) => {
    setSelectedStock(stock);
    setOrderMode("BUY");
    setIsOrderModalOpen(true);
  };

  const handleSell = (stock) => {
    setSelectedStock(stock);
    setOrderMode("SELL");
    setIsOrderModalOpen(true);
  };

  const handleAnalytics = (stock) => {
    setSelectedStock(stock);
    setIsAnalyticsModalOpen(true);
  };

  const filteredStocks = watchlistStocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts"> {filteredStocks.length} / 50</span>
      </div>
      <ul className="list">
        {filteredStocks.map((stock, index) => {
          return (
            <WatchListItem
              stock={stock}
              key={index}
              onBuy={() => handleBuy(stock)}
              onSell={() => handleSell(stock)}
              onAnalytics={() => handleAnalytics(stock)}
            />
          );
        })}
      </ul>

      {/* Buy/Sell Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        stock={selectedStock}
        initialMode={orderMode}
      />

      {/* Analytics/Chart Modal */}
      <AnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        stock={selectedStock}
      />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onBuy, onSell, onAnalytics }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  // Check if the price flashed up or down on this tick
  const flashClass = stock.lastTickDir === "up" ? "flash-up" : stock.lastTickDir === "down" ? "flash-down" : "";

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={flashClass}>
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="percent" style={{ fontSize: "0.8rem", color: "#999" }}>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" style={{ fontSize: "1rem" }} />
          ) : (
            <KeyboardArrowUp className="up" style={{ color: "#4caf50", fontSize: "1rem" }} />
          )}
          <span className="price" style={{ fontWeight: "500", fontSize: "0.85rem" }}>
            {stock.price.toFixed(2)}
          </span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions
          onBuy={onBuy}
          onSell={onSell}
          onAnalytics={onAnalytics}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ onBuy, onSell, onAnalytics }) => {
  return (
    <span className="actions" style={{ display: "flex" }}>
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={(e) => { e.stopPropagation(); onBuy(); }}>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={(e) => { e.stopPropagation(); onSell(); }}>Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={(e) => { e.stopPropagation(); onAnalytics(); }}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
