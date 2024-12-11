import React from "react";
import { Route, Routes } from "react-router-dom";
import PateintCreatePage from "../../components/patientComponents/patientCreatePage/PateintCreatePage";

const RegisterPatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PateintCreatePage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default RegisterPatientRoutes;
