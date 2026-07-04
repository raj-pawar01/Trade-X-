import React from "react";

const Team = () => {
  return (
    <div className="container border-top p-5">
      <h3 className="text-center">People</h3>
      <div className="row">
        <div className="col-5 text-center mt-5 ">
          <img
            src="/media/images/nithinKamath.jpg"
            alt=""
            style={{ width: "50%", borderRadius: "50%" }}
          />
          <h5 className="mt-3">Nithin Kamath</h5>
          <h6 className="text-muted mt-4">Founder, CEO</h6>
        </div>
        <div className="col-7 aboutpara p-5">
          <p>
            Nithin bootstrapped and founded Trade-X in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,{" "}
            <br /> Trade-X has changed the landscape of the Indian broking
            industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            {" "}
            Connect on <a href="">Homepage </a>/ <a href="">TradingQnA </a>/
            <a href=""> Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
