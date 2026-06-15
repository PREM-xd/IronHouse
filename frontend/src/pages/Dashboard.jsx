import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
const [membership, setMembership] =
  useState(null);
  const [paymentHistory,
  setPaymentHistory] =
  useState([]);
  const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState(null);
      const [goal, setGoal] = useState("");
const [benchPR, setBenchPR] = useState("");
const [squatPR, setSquatPR] = useState("");
const [deadliftPR, setDeadliftPR] = useState("");
const [bodyWeight, setBodyWeight] = useState("");
  useEffect(() => {
    fetchBookings();
      fetchMembership();
      fetchPaymentHistory();
      fetchStats();
    
  }, []);
  useEffect(() => {

  if (stats) {

    setGoal(stats.goal || "");

    setBenchPR(stats.benchPR || "");

    setSquatPR(stats.squatPR || "");

    setDeadliftPR(stats.deadliftPR || "");

    setBodyWeight(stats.bodyWeight || "");

  }

}, [stats]);

  const fetchStats = async () => {

  try {

    const response =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/stats/my-stats`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    setStats(response.data);

  } catch (error) {

    console.log(error);

  }

};

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/bookings/my-bookings`,
  {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem(
          "token"
        )}`,
    },
  }
)

      setBookings(response.data);

    } catch (error) {
      console.log(error);
    }

  };
const fetchMembership = async () => {
  try {

    const response =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user-memberships/my-membership`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },
        }
      );

    setMembership(
      response.data
    );

  } catch (error) {

    console.log(error);

  }
};
const fetchPaymentHistory =
  async () => {

    try {

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user-memberships/payment-history`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "token"
                )}`,
            },
          }
        );

      setPaymentHistory(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};
const getDaysRemaining = () => {

  if (!membership)
    return 0;

  const today =
    new Date();

  const expiry =
    new Date(
      membership.expiryDate
    );

  const diff =
    expiry - today;

  return Math.max(
    Math.ceil(
      diff /
      (1000 * 60 * 60 * 24)
    ),
    0
  );
};

const handleRenewMembership =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user-memberships/renew-order/${membership._id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const {
        order,
        key,
      } = response.data;

      const options = {
        key,

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "Iron House",

        description:
          "Membership Renewal",

        order_id:
          order.id,

        handler:
          async function () {

            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/user-memberships/renew/${membership._id}`,
              {},
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

            alert(
              "Membership Renewed Successfully"
            );

            fetchMembership();
          },
      };

      const paymentObject =
        new window.Razorpay(
          options
        );

      paymentObject.open();

    } catch (error) {

      console.log(error);

      alert(
        "Renewal Failed"
      );

    }
};
console.log(bookings);
const handleSaveStats = async () => {

  try {

    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/stats/update`,
      {
        goal,
        benchPR,
        squatPR,
        deadliftPR,
        bodyWeight,
        fitnessScore:
          Math.round(
            (
              Number(benchPR) +
              Number(squatPR) +
              Number(deadliftPR)
            ) / 5
          )
      },
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Stats Updated Successfully");

    fetchStats();

  } catch (error) {

    console.log(error);

    alert("Failed To Update Stats");

  }

};
  return (

    <div className="dashboard-container">
<div className="hero-dashboard">

  <div className="hero-card">
    <h3>🔥 Fitness Score</h3>
    <h1>{stats?.fitnessScore || 0}</h1>
  </div>

  <div className="hero-card">
    <h3>🎯 Goal</h3>
    <h1>{stats?.goal || "Not Set"}</h1>
  </div>

  <div className="hero-card">
    <h3>📅 Days Left</h3>
    <h1>{getDaysRemaining()}</h1>
  </div>

<div className="hero-card">
  <h3>💳 Membership</h3>
  <h1>
    {membership?.membership?.name}
  </h1>
</div>

</div> 

<div className="pr-section">

<h2>🏆 Personal Records</h2>

<div className="hero-dashboard">

<div className="hero-card">
<h3>Bench PR</h3>
<h1>{stats?.benchPR || 0}kg</h1>
</div>

<div className="hero-card">
<h3>Squat PR</h3>
<h1>{stats?.squatPR || 0}kg</h1>
</div>

<div className="hero-card">
<h3>Deadlift PR</h3>
<h1>{stats?.deadliftPR || 0}kg</h1>
</div>

<div className="hero-card">
<h3>Total</h3>
<h1>{
(stats?.benchPR || 0)
+
(stats?.squatPR || 0)
+
(stats?.deadliftPR || 0)
}kg</h1>
</div>

</div>

</div>
<div className="dashboard-card">

  <h2>🏋️ Update Stats</h2>

  <input
    type="text"
    placeholder="Goal"
    value={goal}
    onChange={(e) =>
      setGoal(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Bench PR"
    value={benchPR}
    onChange={(e) =>
      setBenchPR(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Squat PR"
    value={squatPR}
    onChange={(e) =>
      setSquatPR(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Deadlift PR"
    value={deadliftPR}
    onChange={(e) =>
      setDeadliftPR(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Body Weight"
    value={bodyWeight}
    onChange={(e) =>
      setBodyWeight(e.target.value)
    }
  />

  <button
    className="trial-btn"
    onClick={handleSaveStats}
  >
    Save Stats
  </button>

</div>
<h1>
Welcome Back 💪
</h1>

<p>
Track your progress and dominate your goals.
</p>

      <div className="dashboard-grid">

 {membership && (

  <div className="dashboard-card">

    <h2>My Membership</h2>

    <p>
      <strong>Plan:</strong>{" "}
      {membership?.membership?.name}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {membership.status}
    </p>

    <p>
      <strong>Start Date:</strong>{" "}
      {new Date(
        membership.startDate
      ).toLocaleDateString()}
    </p>

    <p>
      <strong>Expiry Date:</strong>{" "}
      {new Date(
        membership.expiryDate
      ).toLocaleDateString()}
    </p>

    <p>
      <strong>Days Remaining:</strong>{" "}
      {getDaysRemaining()}
    </p>
{getDaysRemaining() <= 7 &&
 getDaysRemaining() > 0 && (

  <p
    style={{
      color: "orange",
      fontWeight: "bold",
    }}
  >
    Membership expiring soon!
  </p>

)}



{getDaysRemaining() === 0 && (

  <p
    style={{
      color: "red",
      fontWeight: "bold",
    }}
  >
    Membership Expired
  </p>

)}
    <span
      className={`status-tag ${
        getDaysRemaining() > 0
          ? "Joined"
          : "Not"
      }`}
    >
      {getDaysRemaining() > 0
        ? "Active"
        : "Expired"}
    </span>
<br />
<br />

{getDaysRemaining() <= 70 && (

  <button
    className="trial-btn"
    onClick={
      handleRenewMembership
    }
  >
    Renew Membership
  </button>



)}
  </div>

)}

  {bookings.map((booking) => (

    <div
      key={booking._id}
      className="dashboard-card"
    >

      <h2>{booking.goal}</h2>

      <p>
        📅 {new Date(
          booking.date
        ).toLocaleDateString()}
      </p>

      <p>
        📞 {booking.phone}
      </p>

      <span
        className={`status-tag ${booking.status}`}
      >
        {booking.status}
      </span>

    </div>

  ))}
</div>



<div
  style={{
    marginTop: "50px",
  }}
>
  <h2
    style={{
      color: "white",
      marginBottom: "20px",
    }}
  >
    Payment History
  </h2>

  <div className="dashboard-grid">

    {paymentHistory.map((payment) => (

      <div
        key={payment._id}
        className="dashboard-card"
      >

        <h3>
          {payment.membership?.name}
        </h3>

        <p>
          Amount: ₹{payment.amount}
        </p>

        <p>
          Payment ID:{" "}
          {payment.paymentId || "N/A"}
        </p>

        <p>
          Date:{" "}
          {new Date(
            payment.createdAt
          ).toLocaleDateString()}
        </p>

      </div>

    ))}

  </div>

</div>

</div>

);
}