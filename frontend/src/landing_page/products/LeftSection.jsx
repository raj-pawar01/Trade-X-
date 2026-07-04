import React from "react";

function LeftSection({
  imgURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <>
      <div className="container">
        <div className="row p-5">
          <div className="col-7">
            <img src={imgURL} />
          </div>
          <div className="col-4 mt-5 p-3">
            <h3>{productName}</h3>
            <p className="lh-lg mt-3">{productDescription}</p>
            <div className="row mt-3">
              <div className="col-6">
                <a href={tryDemo}>
                  Try demo <i class="fa-solid fa-arrow-right"></i>{" "}
                </a>
              </div>
              <div className="col-6">
                <a href={learnMore}>
                  Learn more<i class="fa-solid fa-arrow-right"></i>{" "}
                </a>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <a href={googlePlay}>
                  <img
                    src="\media\images\googlePlayBadge.svg"
                    alt="google play"
                  />
                </a>
              </div>
              <div className="col-6">
                <a href={appStore}>
                  <img src="/media/images/appstoreBadge.svg" alt="app store" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSection;
