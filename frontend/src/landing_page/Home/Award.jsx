import React from "react";

const Award = () => {
  return (
    <div className="container mt-2 p-2">
      <div className="row">
        <div className="col-6 p-5">
          <img src="/media/images/largestBroker.svg" alt="awards" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h2>Largest Stock Broker in India</h2>
          <p className="mt-3">
            2+ million Trade-X clients contributed to over 15% of all retail
            orders volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul className="mt-4">
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="mt-4">
                <li>
                  <p>Stocks and IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>

          <img
            src="/media/images/pressLogos.png"
            alt=" presss img"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Award;
