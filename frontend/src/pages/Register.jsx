import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      window.location.href = "/login";

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <>
      <nav className="auth-navbar">
        <a href="/" className="auth-home-logo">
          Fit<span>Zone</span>
        </a>
      </nav>

      <div className="auth-container">
        <div className="auth-card">

          <h1 className="auth-logo">
            Fit<span>Zone</span>
          </h1>

          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Start your transformation today.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="auth-btn"
            onClick={handleRegister}
          >
            Create Account
          </button>

          <p className="auth-link">
            Already have an account?
            <a href="/login"> Login</a>
          </p>

        </div>
      </div>
    </>
  );
}