import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

   localStorage.setItem(

  "token",

  response.data.token

);

localStorage.setItem(

  "role",

  response.data.role

);

alert("Login Successful");

      const params = new URLSearchParams(
  window.location.search
);

const redirect = params.get("redirect");

if (redirect) {
  window.location.href = `/${redirect}`;
} else {
  window.location.href = "/";
}

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
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

          <h2>Welcome Back</h2>

          <p className="auth-subtitle">
            Login to continue your fitness journey.
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
<p

  style={{

    marginTop: "10px",

    marginBottom: "15px",

    textAlign: "right",

  }}

>

  <a href="/forgot-password">

    Forgot Password?

  </a>

</p>
          <button
            className="auth-btn"
            onClick={handleLogin}
          >
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