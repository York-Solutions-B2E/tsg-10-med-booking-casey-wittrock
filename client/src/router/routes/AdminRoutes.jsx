import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Home</div>} />
      <Route path="/appointments" element={<div>Appointments</div>} />
      <Route path="/patients" element={<div>Patients</div>} />
      <Route path="/doctors" element={<div>Doctors</div>} />
      <Route path="/settings" element={<div>Settings</div>} />
    </Routes>
  );
};

export default AdminRoutes;
