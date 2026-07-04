import React, { useState } from "react";

const Apps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [connectedApps, setConnectedApps] = useState({ smallcase: true }); // Default connect Smallcase
  const [connectingApp, setConnectingApp] = useState(null);

  const categories = ["All", "Investing", "Trading", "Advisory", "Insurance"];

  const appsData = [
    {
      id: "smallcase",
      name: "Smallcase",
      description: "Invest in curated baskets of stocks & ETFs based on ideas, themes, and sector strategies.",
      category: "Investing",
      color: "#1e88e5",
      iconText: "SC",
      points: ["Diversified portfolios", "Professional research", "Low-cost rebalancing"]
    },
    {
      id: "streak",
      name: "Streak",
      description: "Create, backtest and deploy trading algorithms without writing code. Direct execution from charts.",
      category: "Trading",
      color: "#e53935",
      iconText: "ST",
      points: ["No-code algorithms", "Historical backtesting", "Real-time scanners"]
    },
    {
      id: "sensibull",
      name: "Sensibull",
      description: "India's largest options trading platform. Create strategies, analyze payoffs, and manage risk easily.",
      category: "Trading",
      color: "#ffb300",
      iconText: "SB",
      points: ["Easy strategy builder", "Real-time F&O analysis", "Virtual options trading"]
    },
    {
      id: "goldenpi",
      name: "GoldenPi",
      description: "Invest in high-yield corporate bonds, government securities, and fixed income assets.",
      category: "Investing",
      color: "#43a047",
      iconText: "GP",
      points: ["8% to 12% yield bonds", "Secured investments", "Direct corporate bond access"]
    },
    {
      id: "ditto",
      name: "Ditto",
      description: "Spam-free term life and health insurance consultation. Compare plans and buy with zero pushy sales.",
      category: "Insurance",
      color: "#8e24aa",
      iconText: "DI",
      points: ["100% spam-free advisory", "Handpicked plans only", "Complete claim support"]
    },
    {
      id: "tijori",
      name: "Tijori",
      description: "In-depth fundamental equity research, corporate structure trackers, and market share indicators.",
      category: "Advisory",
      color: "#00acc1",
      iconText: "TJ",
      points: ["Corporate lineage maps", "Granular revenue breakdown", "Macroeconomic charts"]
    }
  ];

  const handleConnect = (appId) => {
    setConnectingApp(appId);
    setTimeout(() => {
      setConnectedApps((prev) => ({ ...prev, [appId]: true }));
      setConnectingApp(null);
    }, 1500);
  };

  const handleDisconnect = (appId) => {
    setConnectedApps((prev) => {
      const updated = { ...prev };
      delete updated[appId];
      return updated;
    });
  };

  const filteredApps = appsData.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: "10px" }}>
      {/* Header section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "25px" }}>
        <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: "300", color: "#444" }}>Apps</h3>
        <input
          type="text"
          placeholder="Search partner apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.85rem",
            width: "250px",
            outline: "none"
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #eee",
              backgroundColor: selectedCategory === cat ? "#4184f3" : "#fbfbfb",
              color: selectedCategory === cat ? "white" : "#666",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "500",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid view */}
      {filteredApps.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#999", border: "1px dashed #eee", borderRadius: "6px" }}>
          No partner applications match your search.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px" }}>
          {filteredApps.map((app) => {
            const isConnected = connectedApps[app.id];
            const isConnecting = connectingApp === app.id;

            return (
              <div
                key={app.id}
                className="app-card"
                style={{
                  border: "1px solid #eee",
                  borderRadius: "5px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
              >
                <div>
                  {/* Category & Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: app.color,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.1rem"
                      }}
                    >
                      {app.iconText}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#888",
                        backgroundColor: "#f5f5f5",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontWeight: "500"
                      }}
                    >
                      {app.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>{app.name}</h4>
                  <p style={{ margin: "0 0 15px", fontSize: "0.85rem", color: "#666", lineHeight: "1.4" }}>{app.description}</p>

                  {/* Features List */}
                  <ul style={{ margin: "0 0 20px", paddingLeft: "20px", fontSize: "0.8rem", color: "#777", lineHeight: "1.6" }}>
                    {app.points.map((p, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>{p}</li>
                    ))}
                  </ul>
                </div>

                {/* Connection button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isConnected ? (
                    <>
                      <span style={{ fontSize: "0.85rem", color: "#4caf50", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                        ✓ Connected
                      </span>
                      <button
                        onClick={() => handleDisconnect(app.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff5722",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          padding: "5px ",
                          fontWeight: "500"
                        }}
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      disabled={isConnecting}
                      onClick={() => handleConnect(app.id)}
                      style={{
                        width: "60%",
                        padding: "8px",
                        backgroundColor: isConnecting ? "#f5f5f5" : "#4184f3",
                        color: isConnecting ? "#999" : "white",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        cursor: isConnecting ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s"
                      }}
                    >
                      {isConnecting ? "Connecting..." : "Connect app"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Apps;
