import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organization_type: "",
    organization_name: "",
    city: "",
    contact_number: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.organization_type ||
      !form.organization_name ||
      !form.city ||
      !form.contact_number ||
      !form.password ||
      !form.confirm_password
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_type: form.organization_type,
          organization_name: form.organization_name,
          city: form.city,
          contact_number: form.contact_number,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
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
          <div className="auth-icon">+</div>
          <h1 className="auth-title">Register Emergency Organization</h1>
          <p className="auth-subtitle">
            Create an account for Police or Hospital emergency teams
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Organization Type</label>
          <select
            className="auth-input"
            value={form.organization_type}
            onChange={(e) => handleChange("organization_type", e.target.value)}
          >
            <option value="">Select organization type</option>
            <option value="Police">Police</option>
            <option value="Hospital">Hospital</option>
          </select>

          <label>Organization Name</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter organization name"
            value={form.organization_name}
            onChange={(e) => handleChange("organization_name", e.target.value)}
          />

          <label>City</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter city"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <label>Contact Number</label>
          <input
            className="auth-input"
            type="text"
            placeholder="07XXXXXXXX"
            value={form.contact_number}
            onChange={(e) => handleChange("contact_number", e.target.value)}
          />

          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Re-enter password"
            value={form.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}