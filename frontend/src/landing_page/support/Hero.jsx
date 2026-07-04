import React from "react";

const Hero = () => {
  return (
    <div className="header mt-5" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="container p-5">
        <div className="row">
          <div className="col">
            <h1>Support Portal</h1>
          </div>
          <div className="col">
            <button
              className="p-2 fs-5 fw-medium rounded"
              style={{
                backgroundColor: "#397dd0",
                color: "#fff",
                border: "none",
                marginLeft: "30rem",
              }}
            >
              My tickets
            </button>
          </div>
        </div>

        <div class="input-group  input-group-lg p-2 mt-3 mb-3 border bg-white">
          <span
            style={{ border: "none", opacity: "0.8" }}
            class="input-group-text"
            id="inputGroup-sizing-default"
          >
            <i class="fa-solid fa-magnifying-glass p-2 fs-5"></i>
          </span>
          <input
            style={{ opacity: "0.8", border: "none" }}
            type="text"
            placeholder="Eg: How do I open my account, How do i activate F&O..."
            class="form-control fs-6"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
