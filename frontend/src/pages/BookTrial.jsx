import axios from "axios";
import React, { useState } from "react";

export default function BookTrial() {
  const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
const handleBooking = async () => {
  try {
   const response = await axios.post(
  "http://localhost:8000/api/bookings",
  {
    name,
    phone,
    goal,
    date,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert(response.data.message);

    setName("");
    setPhone("");
    setGoal("");
    setDate("");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Booking Failed"
    );
  }
};
  return (
    <div className="trial-container">

      <div className="trial-card">

        <h1>Book Your Free Trial</h1>

        <p>
          Claim your free strength assessment and gym trial.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="">Select Goal</option>
          <option value="Strength">
            Strength Training
          </option>
          <option value="Fat Loss">
            Fat Loss
          </option>
          <option value="Bodybuilding">
            Bodybuilding
          </option>
          <option value="Powerlifting">
            Powerlifting
          </option>
        </select>

       <button
  className="trial-btn"
  onClick={handleBooking}
>
  Book Trial
</button>

      </div>

    </div>
  );
}