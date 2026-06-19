import React, { useState } from "react";
import axios from "axios";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const requestNotificationPermission =
  async (token) => {
        console.log("FCM function started");
    try {
      const permission =
        await Notification.requestPermission();

     console.log("Permission:", permission);

if (permission === "granted") {
console.log("Getting FCM token...");
  const fcmToken =
    await getToken(messaging, {
      vapidKey:
        "BAnccXVP1-YKC1ayZDobM6ex_gCVg-4GVEWK5bRRxx_1nAn05AZAgqFS2VjzLP3IVeShfr43LzO0LbWzXYqdN1o",
    });

  console.log("FCM TOKEN:", fcmToken);

 
    
  
}

      
      
    } catch (error) {
  console.error(
    "FCM ERROR:",
    error
  );
}
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

console.log(
  "LOGIN RESPONSE:",
  response.data
);

localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "role",
  response.data.role
);

console.log("BEFORE FCM");

await requestNotificationPermission(
  response.data.token
);

console.log("AFTER FCM");

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
const handleGoogleLogin = () => {
  window.location.href =
    `${import.meta.env.VITE_API_URL}/api/auth/google`;
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
<button
  className="auth-btn"
  onClick={handleGoogleLogin}
  style={{
    marginTop: "10px",
    background: "#fff",
    color: "#000",
    border: "1px solid #ddd",
  }}
>
  Continue with Google
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