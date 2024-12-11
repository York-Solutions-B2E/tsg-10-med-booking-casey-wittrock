import React, { useEffect, useState } from "react";

import useAppContext from "../../../hooks/useAppContext";

import { useNavigate } from "react-router-dom";

import AppointmentTable from "./AppointmentTable";

const PatientHomePage = () => {
  const { appointments } = useAppContext();
  return (
    <div>
      <h2>Appointments</h2>
      {appointments === 0 ? (
        <div>No appointments</div>
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </div>
  );
};
export default PatientHomePage;
