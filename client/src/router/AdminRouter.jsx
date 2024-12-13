import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminHome from "../components/adminComponents/adminHome/AdminHome";
import AdminDoctorPage from "../components/adminComponents/doctorPage/AdminDoctorPage";
import AdminDoctorRoutes from "./routes/AdminDoctorRoutes";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminHome />} />
      <Route
        path="/admin/specializations/"
        element={<div>This feature coming soon!</div>}
      />
      <Route path="/admin/doctors/*" element={<AdminDoctorRoutes />} />
      <Route
        path="/admin/patients/*"
        element={<div>This feature coming soon</div>}
      />
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default AdminRouter;
