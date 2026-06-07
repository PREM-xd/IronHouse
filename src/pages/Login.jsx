import React from "react";
export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>

        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}