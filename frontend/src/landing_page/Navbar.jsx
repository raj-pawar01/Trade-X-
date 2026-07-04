import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom fixed-top">
      <div className="container p-2">
        <Link className="navbar-brand mx-4" to="/">
          <img
            src="/media/images/main_logo-removebg-preview.png"
            alt="Trade-X logo"
            style={{ width: "22%" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
            {isLoggedIn ? (
              <>
                <li className="nav-item mx-3">
                  <a
                    className="nav-link active fw-bold"
                    href="http://localhost:3001/"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <button
                    className="nav-link btn btn-link active fw-bold text-danger border-0 p-0"
                    onClick={handleLogout}
                    style={{ background: "none", verticalAlign: "middle" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link active" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link active" to="/support">
                Support
              </Link>
            </li>
            <li className="nav-item mx-3 mt-2 fs-5 ">
              <i className="fa-solid fa-bars"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
