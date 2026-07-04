import React from "react";

const Hero = () => {
  return (
    <div className="container p-2 mt-5">
      <div className="row text-center">
        <img
          src="/media/images/homeHero.png"
          alt="hero-image"
          className="mb-5 "
        />
        <h1 className="mt-2 text-muted fs-3">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button
          className=" btn btn-primary fs-5 p-2"
          style={{ width: "20%", margin: "auto" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
};

export default Hero;
