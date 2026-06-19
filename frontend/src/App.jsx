import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookTrial from "./pages/BookTrial";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Memberships from "./pages/Memberships";

import ForgotPassword
  from "./pages/ForgotPassword";
  import ResetPassword
  from "./pages/ResetPassword";
import GoogleSuccess from "./pages/GoogleSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-trial" element={<BookTrial />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route
  path="/memberships"
  element={<Memberships />}
/>
<Route
  path="/forgot-password"
  element={
    <ForgotPassword />
  }
/>
<Route
  path="/reset-password/:token"
  element={
    <ResetPassword />
  }
/>
<Route
  path="/google-success"
  element={<GoogleSuccess />}
/>

      </Routes>
    </BrowserRouter>
  );
}