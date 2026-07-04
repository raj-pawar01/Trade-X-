import React from "react";

const Hero = () => {
  return (
    <div className="container p-4">
      <div className="row text-center p-5 mt-5">
        <h2>Charges</h2>
        <h5 className="text-muted mt-3">List of all charges and taxes</h5>
      </div>
      <div className="row text-center p-5">
        <div className="col mt-5">
          <img src="/media/images/pricingMF.svg" alt="" className="p-5" />
          <h3>Free equity delivery</h3>
          <p className="mt-4 text-muted" style={{ fontSize: "1.1em" }}>
            All equity delivery investments (NSE, BSE), <br />
            are absolutely free — ₹ 0 brokerage.
          </p>
        </div>
        <div className="col mt-5">
          <img src="/media/images/intradayTrades.svg" alt="" className="p-5" />
          <h3>Intraday and F&O trades</h3>
          <p className="mt-4 text-muted " style={{ fontSize: "1.1em" }}>
            Flat ₹ 20 or 0.03% (whichever is lower) per <br /> executed order on
            intraday trades across <br /> equity, currency, and commodity
            trades. Flat
            <br /> ₹20 on all option trades.
          </p>
        </div>
        <div className="col mt-5">
          <img src="/media/images/pricingMF.svg" alt="" className="p-5" />
          <h3>Free direct MF</h3>
          <p className="mt-4 text-muted" style={{ fontSize: "1.1em" }}>
            All direct mutual fund investments are <br />
            absolutely free — ₹ 0 commissions & DP <br />
            charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
