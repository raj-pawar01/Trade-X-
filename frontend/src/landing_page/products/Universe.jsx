import React from "react";
import { useNavigate } from "react-router-dom";

const Universe = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="container text-center p-5">
      <h3 className="text-muted">The Trade-X Universe</h3>
      <p className="mt-3">
        Extend your trading and investment experience even further with our
        partner platforms
      </p>
      <div className="row p-5">
        <div className="col-4">
          <img
            src="/media/images/zerodhaFundhouse.png"
            alt="fund house"
            style={{ width: "55%" }}
          />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Our asset management venture <br />
            that is creating simple and transparent index <br />
            funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4">
          <img
            src="/media/images/sensibullLogo.svg"
            alt="sensibull"
            style={{ width: "65%" }}
          />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Options trading platform that lets you <br />
            create strategies, analyze positions, and examine <br />
            data points like open interest, FII/DII, and more.
          </p>
        </div>
        <div className="col-4">
          <img src="/media/images/tijori-logo.png" alt="tijori" />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Investment research platform <br /> that offers detailed insights on
            stocks, <br />
            sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4">
          <img
            src="/media/images/streakLogo.png"
            alt="Strike"
            style={{ width: "35%" }}
          />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Systematic trading platform <br />
            that allows you to create and backtest
            <br />
            strategies without coding.
          </p>
        </div>
        <div className="col-4">
          <img src="/media/images/smallcaseLogo.png" alt="Smallcase" />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Thematic investing platform <br /> that helps you invest in
            diversified
            <br />
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4">
          <img
            src="/media/images/dittoLogo.png"
            alt="ditto"
            style={{ width: "30%" }}
          />
          <p className="mt-3 text-muted " style={{ fontSize: "0.75rem" }}>
            Personalized advice on life <br />
            and health insurance. No spam <br />
            and no mis-selling.
          </p>
        </div>
      </div>

      <div className="container text-center mt-3">
        <button onClick={handleSignup} className="btn btn-primary fs-4">
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default Universe;
