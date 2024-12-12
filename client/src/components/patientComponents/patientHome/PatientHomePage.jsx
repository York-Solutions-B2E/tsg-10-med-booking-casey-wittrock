import React, { useEffect, useState } from "react";

import useAppContext from "../../../hooks/useAppContext";

import { useNavigate } from "react-router-dom";

import AppointmentTable from "./AppointmentTable";

const PatientHomePage = () => {
  const { appointments } = useAppContext();
  return (
    <div className="container flex-col justify-items-center pt-[10rem]">
      <h2>Appointments</h2>
      <AppointmentTable appointments={appointments} />
    </div>
  );
};
export default PatientHomePage;
