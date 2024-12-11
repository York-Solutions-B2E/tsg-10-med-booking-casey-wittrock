import React from "react";
import { Route, Routes } from "react-router-dom";
import ApptCreatePage from "../../components/patientComponents/appointmentCreatePage/ApptCreatePage";

const AppointmentRoutes = () => {
  return (
    <Routes>
      <Route path="/create" element={<ApptCreatePage />} />
      <Route path="/:id" element={<div>Appointment</div>} />
      <Route path="/:id/reschedule" element={<div>Appointments</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AppointmentRoutes;
