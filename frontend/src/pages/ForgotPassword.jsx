import React, {
  useState,
} from "react";

import axios from "axios";

export default function ForgotPassword() {

  const [email,
    setEmail] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
            { email }
          );

        alert(
          response.data.message
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );

      }
    };

  return (

    <div
      className="auth-container"
    >

      <form
        className="auth-form"
        onSubmit={
          handleSubmit
        }
      >

        <h2>
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
        >
          Send Reset Link
        </button>

      </form>

    </div>

  );
}