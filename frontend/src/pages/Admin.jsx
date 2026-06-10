import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  
  const role = localStorage.getItem("role");
const [bookings, setBookings] = useState([]);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [plans, setPlans] = useState([]);
const [revenueStats,
  setRevenueStats] =
  useState(null);

const [planName, setPlanName] = useState("");
const [planPrice, setPlanPrice] = useState("");
const [planDuration, setPlanDuration] = useState("");
const [planDescription, setPlanDescription] = useState("");
const [editingPlanId,
  setEditingPlanId] = useState(null);

const filteredBookings = bookings.filter(
  (booking) => {

    const matchesSearch =
      booking.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      booking.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  }
);

if (role !== "admin") {

  return (
    <h1
      style={{
        color: "white",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      Access Denied
    </h1>
  );
}

useEffect(() => {
  fetchBookings();
  fetchPlans();
  fetchRevenueStats();
}, []);

 const fetchBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/bookings",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    setBookings(response.data);

  } catch (error) {
    console.log(error);

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      alert("Access Denied");


window.location.replace("/");    }
  }
};
const fetchPlans = async () => {
  try {

    const response = await axios.get(
      "http://localhost:8000/api/memberships"
    );

    setPlans(response.data);

  } catch (error) {
    console.log(error);
  }
};
const fetchRevenueStats =
  async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/api/user-memberships/revenue",
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "token"
                )}`,
            },
          }
        );

      setRevenueStats(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};
const handleAddPlan = async () => {
  if (

    !planName ||

    !planPrice ||

    !planDuration ||

    !planDescription

  ) {

    alert("Fill all fields");

    return;

  }
  try {

    const token =
      localStorage.getItem("token");
  if (editingPlanId) {

  await axios.put(
    `http://localhost:8000/api/memberships/${editingPlanId}`,
    {
      name: planName,
      price: planPrice,
      duration: planDuration,
      description:
        planDescription,
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

} else {

  await axios.post(
    "http://localhost:8000/api/memberships",
    {
      name: planName,
      price: planPrice,
      duration: planDuration,
      description:
        planDescription,
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

}

setPlanName("");
setPlanPrice("");
setPlanDuration("");
setPlanDescription("");

setEditingPlanId(null);

fetchPlans();

} catch (error) {
  console.log(error);
}
};

const handleDelete = async (id) => {
  try {

    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

   await axios.delete(
  `http://localhost:8000/api/bookings/${id}`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  }
);

    fetchBookings();

  } catch (error) {
    console.log(error);
  }
};
const handleDeletePlan = async (id) => {
  try {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8000/api/memberships/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchPlans();

  } catch (error) {
    console.log(error);
  }
};

const handleEditPlan = (
  plan
) => {

  setEditingPlanId(
    plan._id
  );

  setPlanName(
    plan.name
  );

  setPlanPrice(
    plan.price
  );

  setPlanDuration(
    plan.duration
  );

  setPlanDescription(
    plan.description
  );
};
const handleStatusChange = async (id, status) => {
  try {
   await axios.put(
  `http://localhost:8000/api/bookings/${id}`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "token"
      )}`,
    },
  }
);

    fetchBookings();

  } catch (error) {
    console.log(error);
  }
};
const totalLeads = bookings.length;

const pendingLeads = bookings.filter(
  (b) => b.status === "Pending"
).length;

const contactedLeads = bookings.filter(
  (b) => b.status === "Contacted"
).length;

const joinedLeads = bookings.filter(
  (b) => b.status === "Joined"
).length;
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#f39c12";

    case "Contacted":
      return "#3498db";

    case "Joined":
      return "#2ecc71";

    case "Not Interested":
      return "#e74c3c";

    default:
      return "#777";
  }
};

  return (
    <div className="admin-container">
      <nav className="admin-navbar">

  <div className="admin-logo">
    Iron<span>House</span> Admin
  </div>

  <div className="admin-actions">
<span className="admin-user">
  Welcome, Admin
</span>
    <button
      className="admin-logout-btn"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
      }}
    >
      Logout
    </button>

  </div>

</nav>


<div className="stats-grid">

  <div className="stat-card">
    <div className="stat-icon">👥</div>
    <h2>{totalLeads}</h2>
    <p>Total Leads</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">⏳</div>
    <h2>{pendingLeads}</h2>
    <p>Pending</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">📞</div>
    <h2>{contactedLeads}</h2>
    <p>Contacted</p>
  </div>

  <div className="stat-card">
    <div className="stat-icon">💪</div>
    <h2>{joinedLeads}</h2>
    <p>Joined</p>
  </div>

  {revenueStats && (
    <>
      <div className="stat-card">
        <h2>
          ₹{revenueStats.totalRevenue}
        </h2>
        <p>Total Revenue</p>
      </div>

      <div className="stat-card">
        <h2>
          {revenueStats.totalSales}
        </h2>
        <p>Membership Sales</p>
      </div>

      <div className="stat-card">
        <h2>
          {revenueStats.active}
        </h2>
        <p>Active Plans</p>
      </div>

      <div className="stat-card">
        <h2>
          {revenueStats.expired}
        </h2>
        <p>Expired Plans</p>
      </div>
    </>
  )}

</div>





      <div className="admin-tools">

 <input
  type="text"
  placeholder="Search by name..."
  className="search-input"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


<select
  className="filter-select"
  value={statusFilter}
  onChange={(e) =>
    setStatusFilter(e.target.value)
  }
>

  <option value="All">
    All Status
  </option>

  <option value="Pending">
    Pending
  </option>

  <option value="Contacted">
    Contacted
  </option>

  <option value="Joined">
    Joined
  </option>

  <option value="Not Interested">
    Not Interested
  </option>

</select>

</div>
<div className="admin-header">

  <h1 className="admin-heading">
    Trial Booking Management
  </h1>

  <span className="lead-count">
    {filteredBookings.length} Leads
  </span>

</div>
      <div className="table-container">

  <table className="booking-table">

    <thead>

      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Goal</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>

    </thead>

 <tbody>

  {filteredBookings.length === 0 ? (

    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        No Bookings Found
      </td>
    </tr>

  ) : (

    filteredBookings.map((booking) => (

      <tr key={booking._id}>

        <td>{booking.name}</td>

        <td>{booking.phone}</td>

<td>
  <span className="goal-badge">
    {booking.goal}
  </span>
</td>
        <td>
          {new Date(
            booking.date
          ).toLocaleDateString()}
        </td>

       <td>

  <span
    className="status-badge"
    style={{
      backgroundColor:
        getStatusColor(
          booking.status
        )
    }}
  >
    {booking.status}
  </span>

  <br />
  <br />

  <select
    value={booking.status}
    onChange={(e) =>
      handleStatusChange(
        booking._id,
        e.target.value
      )
    }
  >
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Joined">Joined</option>
            <option value="Not Interested">
              Not Interested
            </option>
          </select>
        </td>

        <td>
          <button
            className="delete-btn"
            onClick={() =>
              handleDelete(booking._id)
            }
          >
            Delete
          </button>
        </td>

      </tr>

    ))

  )}

</tbody>

  </table>

</div>
<hr
  style={{
    margin: "50px 0",
    borderColor: "#333",
  }}
/>

<h1>
  Membership Management
</h1>

<div className="membership-form">

  <input
    type="text"
    placeholder="Plan Name"
    value={planName}
    onChange={(e) =>
      setPlanName(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Price"
    value={planPrice}
    onChange={(e) =>
      setPlanPrice(e.target.value)
    }
  />

  <input
    type="text"
    placeholder="Duration"
    value={planDuration}
    onChange={(e) =>
      setPlanDuration(e.target.value)
    }
  />

  <input
    type="text"
    placeholder="Description"
    value={planDescription}
    onChange={(e) =>
      setPlanDescription(
        e.target.value
      )
    }
  />

 <button
  onClick={handleAddPlan}
  className="trial-btn"
>
  {editingPlanId
    ? "Update Plan"
    : "Add Plan"}
</button>

</div>

<div className="dashboard-grid">

  {plans.map((plan) => (

    <div
      key={plan._id}
      className="dashboard-card"
    >

      <h2>{plan.name}</h2>

      <h3>
        ₹{plan.price}
      </h3>

      <p>
        {plan.duration}
      </p>

      <p>
        {plan.description}
      </p>

      <button
  className="trial-btn"
  onClick={() =>
    handleEditPlan(plan)
  }
>
  Edit
</button>
<button
  className="delete-btn"
  onClick={() =>
    handleDeletePlan(plan._id)
  }
>
  Delete
</button>
<br />
<br />

    </div>

  ))}

</div>
    </div>
  );
}