import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDoctorPage from "../../components/adminComponents/doctorPage/AdminDoctorPage";
import AdminEditDoctorPage from "../../components/adminComponents/doctorPage/AdminEditDoctorPage";

const AdminDoctorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDoctorPage />} />
      <Route path="/:id" element={<AdminEditDoctorPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AdminDoctorRoutes;
