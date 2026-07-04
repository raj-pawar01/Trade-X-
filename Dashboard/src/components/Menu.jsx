import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("USERID");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "http://localhost:3000/login";
  };

  const avatarInitials = username.substring(0, 2).toUpperCase();

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="\borcelle.png" style={{ width: "55px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div
          className="profile"
          style={{ position: "relative" }}
          onClick={handleProfileClick}
        >
          <div className="avatar">{avatarInitials}</div>
          <p className="username">{username}</p>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "4px",
                padding: "10px",
                zIndex: 100,
                minWidth: "120px",
                border: "1px solid #eee",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  color: "#df5b2b",
                  border: "none",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
