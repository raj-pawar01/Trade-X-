import React from "react";
import { useNavigate } from "react-router-dom";

const OpenAccount = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container p-5">
      <div className="row text-center">
        <h1 className="mt-5 text-muted fs-3">Open a Trade-X account</h1>

        <p className="mt-3">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>

        <button
          onClick={() => {
            handleSignup();
            window.scrollTo(0, 0);
          }}
          className="btn btn-primary fs-5 p-2 mt-3"
          style={{ width: "20%", margin: "auto" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default OpenAccount;
