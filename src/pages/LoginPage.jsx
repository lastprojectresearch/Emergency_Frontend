import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function LoginPage() {
  const navigate = useNavigate();

  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!contactNumber || !password) {
      setError("Please enter contact number and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_number: contactNumber,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("anzen_user", JSON.stringify(data.user));
      navigate(data.redirect_to);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top">
          <div className="auth-icon">🔐</div>
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle">
            Sign in to access your emergency dashboard
          </p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>Contact Number</label>
          <input
            className="auth-input"
            type="text"
            placeholder="07XXXXXXXX"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />

          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}