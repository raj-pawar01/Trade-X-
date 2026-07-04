import React from "react";

const RightSection = ({
  imgURL,
  productName,
  productDescription,
  learnMore,
}) => {
  return (
    <>
      <div className="container">
        <div className="row m-3 p-5">
          <div className="col-4  p-5" style={{ marginTop: "7rem" }}>
            <h3>{productName}</h3>
            <p className="lh-lg mt-3">{productDescription}</p>
            <div className="row mt-3">
              <div className="col-6">
                <a href={learnMore}>
                  Learn more<i class="fa-solid fa-arrow-right"></i>{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="col"></div>
          <div className="col-7">
            <img src={imgURL} style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSection;
