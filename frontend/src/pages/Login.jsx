import React from "react";

export default function Login() {
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

        <h2>Welcome Back</h2>
        <p className="auth-subtitle">
          Login to continue your fitness journey.
        </p>

        <input type="email" placeholder="Email Address" />

        <input type="password" placeholder="Password" />

        <button className="auth-btn">
          Login
        </button>

        <p className="auth-link">
          Don't have an account?
          <a href="/register"> Sign Up</a>
        </p>

      </div>
    </div>
     </>

  );
}