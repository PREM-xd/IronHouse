import React, { useEffect } from "react";
import { registerFCM } from "../utils/fcm";

export default function GoogleSuccess() {
  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    if (token) {
      localStorage.setItem(
        "token",
        token
      );

      registerFCM();

      window.location.href =
        "/";
    }
  }, []);

  return (
    <h2>Logging you in...</h2>
  );
}