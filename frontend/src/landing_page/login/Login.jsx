import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:8080"
  ).replace(/\/$/, "");
  const dashboardUrl = (
    import.meta.env.VITE_DASHBOARD_URL || "http://localhost:3001"
  ).replace(/\/$/, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${apiBaseUrl}/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = `${dashboardUrl}/?token=${token}&username=${encodeURIComponent(user.username)}`;
    } catch (err) {
      console.error("Login request failed:", err);
      setError(
        err.response?.data?.error ||
          (err.code === "ERR_NETWORK"
            ? "Unable to reach the server. Please make sure the backend is running."
            : "Invalid credentials. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mt-5">
      <div className="row justify-content-center p-5">
        <div className="col-lg-4 col-md-6 col-sm-8 border p-5 bg-white rounded shadow-sm">
          <div className="text-center mb-4">
            <img
              src="/media/images/main_logo-removebg-preview.png"
              alt="Trade-X logo"
              style={{ width: "40%" }}
              className="mb-3"
            />
            <h4 className="text-muted fw-bold">Login to Trade-X</h4>
          </div>

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
              <label className="form-label text-muted fs-6">
                Email address
              </label>
              <input
                type="email"
                className="form-control p-2"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: "0.95rem" }}
                required
              />
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label text-muted fs-6">Password</label>
                <a
                  href="#"
                  className="text-decoration-none fs-6"
                  style={{ color: "#387ed1" }}
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                className="form-control p-2"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontSize: "0.95rem" }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 p-2 fs-6 fw-bold border-0"
              style={{ backgroundColor: "#387ed1", transition: "0.3s" }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted fs-6 mb-0">
              New to Trade-X?{" "}
              <a
                href="/signup"
                className="text-decoration-none"
                style={{ color: "#387ed1" }}
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
