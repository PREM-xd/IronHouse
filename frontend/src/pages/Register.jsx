import React from "react";

export default function Register() {
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

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email Address" />

        <input type="password" placeholder="Password" />

        <button className="auth-btn">
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