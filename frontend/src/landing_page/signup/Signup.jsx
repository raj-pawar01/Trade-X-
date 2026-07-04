import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !mobile) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:8080/signup", {
        username,
        email,
        password,
        mobile,
      });

      const { token, user } = res.data;

      // Save token in frontend's localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to Dashboard (port 3001) passing the token and username via URL query parameters
      window.location.href = `http://localhost:3001/?token=${token}&username=${encodeURIComponent(user.username)}`;
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mt-5">
      <div className="text-center text-muted">
        <h3 className="mt-5">Open a free demat and trading account online</h3>
        <h5 className="mt-2 text-muted fw-normal fs-6">
          Start investing brokerage free and join a community of 1.6+ crore
          investors and traders
        </h5>
      </div>

      <div className="row p-5 align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/media/images/account_open.svg"
            alt="account open graphic"
            style={{ width: "85%" }}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 p-4 border bg-white rounded shadow-sm">
          <h4 className="text-muted fw-bold mb-3">Sign up now</h4>
          <p className="text-muted mb-4">
            Create your account to start trading
          </p>

          {error && (
            <div
              className="alert alert-danger py-2 text-center fs-6"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted fs-6 mb-1">
                Username
              </label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ fontSize: "0.95rem" }}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fs-6 mb-1">
                Email address
              </label>
              <input
                type="email"
                className="form-control p-2"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "0.95rem" }}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fs-6 mb-1">
                Password
              </label>
              <input
                type="password"
                className="form-control p-2"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontSize: "0.95rem" }}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-muted fs-6 mb-1">
                Mobile Number
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted fw-bold">
                  +91
                </span>
                <input
                  type="tel"
                  className="form-control p-2"
                  placeholder="Enter 10-digit mobile number"
                  pattern="[0-9]{10}"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{ fontSize: "0.95rem" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 p-2 fs-6 fw-bold border-0"
              style={{ backgroundColor: "#387ed1", transition: "0.3s" }}
            >
              {loading ? "Creating Account..." : "Continue"}
            </button>
          </form>

          <p className="text-muted mt-3 fs-7 text-center">
            By proceeding, you agree to the Trade-X terms & privacy policy.
          </p>
          <hr />
          <p className="fs-6 text-center text-muted mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-decoration-none"
              style={{ color: "#387ed1" }}
            >
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
