import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../../components/adminComponents/adminHome/AdminPage";
import AdminDoctorPage from "../../components/adminComponents/doctorPage/AdminDoctorPage";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/patients" element={<div>Patients</div>} />
      <Route path="/doctors/*" element={<AdminDoctorPage />} />
      <Route path="/specialties" element={<div>Specialties</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AdminRoutes;
