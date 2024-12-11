import React from "react";

import { useParams } from "react-router-dom";

import useAppContext from "../../../hooks/useAppContext";

const AppointmentsPage = () => {
  const { appointments } = useAppContext();
  const { apptId } = useParams();
  const apptIdInt = parseInt(apptId);
  console.log(apptId);
  console.log(appointments);
  const appt =
    appointments[appointments.findIndex((appt) => appt.id === apptIdInt)];
  console.log(appt);
  return (
    <div>
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <div>No appointments</div>
      ) : (
        <div>
          <h3>Appointment Details</h3>
          <div>{appt.reason}</div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
