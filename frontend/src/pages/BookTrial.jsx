import React from "react";

export default function BookTrial() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Book Your Free Trial</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone Number" />

        <input type="date" />

        <select>
          <option>Choose Time Slot</option>
          <option>6 AM - 8 AM</option>
          <option>8 AM - 10 AM</option>
          <option>5 PM - 7 PM</option>
          <option>7 PM - 9 PM</option>
        </select>

        <button>Book My Trial</button>
      </div>
    </div>
  );
}