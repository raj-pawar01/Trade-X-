import React, { useState, useEffect, useRef } from "react";

const AnalyticsModal = ({ isOpen, onClose, stock }) => {
  const [range, setRange] = useState("1M"); // 1W, 1M, 1Y
  const [hoveredData, setHoveredData] = useState(null);
  const containerRef = useRef(null);

  if (!isOpen || !stock) return null;

  // Generate historical data based on stock and range
  const generateData = () => {
    let days = 30;
    if (range === "1W") days = 7;
    if (range === "1M") days = 30;
    if (range === "1Y") days = 12; // 12 months

    const seed = stock.price;
    const dataPoints = [];
    let currentVal = seed;

    for (let i = days - 1; i >= 0; i--) {
      const change = (Math.random() * 4 - 2) / 100; // -2% to +2%
      currentVal = currentVal * (1 - change); // walk backwards
      
      let dateLabel = "";
      if (range === "1W" || range === "1M") {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dateLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      } else {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        dateLabel = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      }

      dataPoints.push({
        price: currentVal,
        label: dateLabel,
      });
    }

    // Replace the final point with the current live price
    dataPoints[dataPoints.length - 1] = {
      price: stock.price,
      label: "Today",
    };

    return dataPoints;
  };

  const chartData = generateData();
  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.99;
  const maxPrice = Math.max(...prices) * 1.01;
  const priceRange = maxPrice - minPrice;

  // SVG dimensions
  const width = 450;
  const height = 220;
  const padding = 20;

  // Convert data points to SVG coordinates
  const points = chartData.map((d, index) => {
    const x = padding + (index / (chartData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.price - minPrice) / priceRange) * (height - padding * 2);
    return { x, y, price: d.price, label: d.label };
  });

  // Construct SVG path for line and area
  let linePath = "";
  let areaPath = "";

  if (points.length > 0) {
    linePath = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");
    areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  }

  // Determine if overall performance is up or down
  const overallUp = stock.price >= chartData[0].price;
  const strokeColor = overallUp ? "#4caf50" : "#ff5722";
  const fillGradientId = `grad-${stock.name}-${range}`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - padding;
    const chartWidth = width - padding * 2;

    if (mouseX >= 0 && mouseX <= chartWidth) {
      const index = Math.round((mouseX / chartWidth) * (chartData.length - 1));
      if (index >= 0 && index < points.length) {
        setHoveredData(points[index]);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

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
          width: "500px",
          backgroundColor: "white",
          borderRadius: "6px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "600", color: "#333" }}>{stock.name} Chart Analysis</h3>
            <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>₹{stock.price.toFixed(2)}</span>
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: stock.isDown ? "#ff5722" : "#4caf50",
                }}
              >
                {stock.percent}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#aaa",
              fontSize: "1.4rem",
              cursor: "pointer",
              padding: 0,
            }}
          >
            &times;
          </button>
        </div>

        {/* Range selectors */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {["1W", "1M", "1Y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: "4px 10px",
                borderRadius: "3px",
                border: range === r ? "1px solid #387ed1" : "1px solid #ddd",
                backgroundColor: range === r ? "#eaf2fb" : "white",
                color: range === r ? "#387ed1" : "#666",
                fontSize: "0.75rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Chart canvas */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#fafafa",
            border: "1px solid #eee",
            borderRadius: "4px",
            overflow: "hidden",
            cursor: "crosshair",
          }}
        >
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((ratio, i) => (
              <line
                key={i}
                x1={padding}
                y1={padding + ratio * (height - padding * 2)}
                x2={width - padding}
                y2={padding + ratio * (height - padding * 2)}
                stroke="#eee"
                strokeWidth="1"
              />
            ))}

            {/* Area Path */}
            <path d={areaPath} fill={`url(#${fillGradientId})`} />

            {/* Line Path */}
            <path d={linePath} fill="none" stroke={strokeColor} strokeWidth="1.8" />

            {/* Interactive tooltip tracker line */}
            {hoveredData && (
              <line
                x1={hoveredData.x}
                y1={padding}
                x2={hoveredData.x}
                y2={height - padding}
                stroke="#ccc"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            )}

            {/* Endpoints dot */}
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill={strokeColor} />

            {/* Tooltip dot */}
            {hoveredData && <circle cx={hoveredData.x} cy={hoveredData.y} r="4.5" fill={strokeColor} stroke="white" strokeWidth="1.5" />}
          </svg>

          {/* Tooltip detail card */}
          {hoveredData && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: hoveredData.x > width / 2 ? "10px" : "auto",
                right: hoveredData.x <= width / 2 ? "10px" : "auto",
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "white",
                padding: "6px 10px",
                borderRadius: "3px",
                fontSize: "0.75rem",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              <span style={{ color: "#aaa" }}>{hoveredData.label}</span>
              <span style={{ fontWeight: "600" }}>₹{hoveredData.price.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* X-Axis labels summary */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px 0", fontSize: "0.7rem", color: "#999" }}>
          <span>{chartData[0].label}</span>
          <span>{chartData[Math.floor(chartData.length / 2)].label}</span>
          <span>{chartData[chartData.length - 1].label}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
export { AnalyticsModal };
