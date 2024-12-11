import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PatientHomePage from "../../components/patientComponents/patientHome/PatientHomePage";
import AppointmentsPage from "../../components/patientComponents/appointmentsPage/AppointmentsPage";
import AppointmentRoutes from "./AppointmentRoutes";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientHomePage />} />
      <Route path="/profile" element={<div>PatientProfile</div>} />
      <Route path="/appointments/*" element={<AppointmentRoutes />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default PatientRoutes;
