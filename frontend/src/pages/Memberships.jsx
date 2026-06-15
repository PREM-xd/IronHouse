import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Memberships() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/memberships`,
      );

      setPlans(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="membership-container">

      <h1>Membership Plans</h1>

      <div className="membership-grid">

        {plans.map((plan) => (
          <div
            key={plan._id}
            className="membership-card"
          >

            <h2>{plan.name}</h2>

            <h3>₹{plan.price}</h3>

            <p>{plan.duration}</p>

            <p>{plan.description}</p>

            <button>
              Join Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}