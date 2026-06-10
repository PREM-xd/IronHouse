import React, {
  useState,
} from "react";

import axios from "axios";

export default function ResetPassword() {

  const [password,
    setPassword] =
    useState("");

  const token =
    window.location.pathname.split(
      "/"
    )[2];

  const handleReset =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            `http://localhost:8000/api/auth/reset-password/${token}`,
            {
              password,
            }
          );

        alert(
          response.data.message
        );

        window.location.href =
          "/login";

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Reset Failed"
        );

      }
    };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={
          handleReset
        }
      >

        <h2>
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
        >
          Reset Password
        </button>

      </form>

    </div>

  );
}