import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import AddDoctor from "./pages/Admin/AddDoctor";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Not logged in
  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  // Logged in (Admin or Doctor)
  return (
    <div className="bg-[#F8F9FF] min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        
        <Sidebar />

        <div className="flex-1">
          <Routes>
            {/* Root redirect based on role */}
            <Route
              path="/"
              element={
                aToken ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/doctor-dashboard" replace />
                )
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={aToken ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/all-appointments"
              element={aToken ? <AllApointments /> : <Navigate to="/" replace />}
            />
            <Route
              path="/add-doctor"
              element={aToken ? <AddDoctor /> : <Navigate to="/" replace />}
            />
            <Route
              path="/doctor-list"
              element={aToken ? <DoctorsList /> : <Navigate to="/" replace />}
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor-dashboard"
              element={dToken ? <DoctorDashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/doctor-appointments"
              element={
                dToken ? <DoctorAppointments /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/doctor-profile"
              element={dToken ? <DoctorProfile /> : <Navigate to="/" replace />}
            />

            {/* If user types any wrong route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
