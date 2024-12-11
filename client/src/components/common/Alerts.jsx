import React from "react";
import { Alert, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Alerts = ({ alert, dismiss }) => {
  if (!alert) return null;

  const navigate = useNavigate();

  console.log(alert);

  const alertComps = () => {
    if ("apptAlert" in alert) {
      return (
        <Alert severity={alert.severity} onClose={() => dismiss(i)}>
          {alert.message}
          <Button onClick={() => navigate(`/appointments/${alert.apptId}`)}>
            View Appointment
          </Button>
        </Alert>
      );
    } else {
      return (
        <Alert severity={alert.severity} onClose={dismiss}>
          {alert.message}
        </Alert>
      );
    }
  };

  return <Box className="fixed z-50 right-10 top-10">{alertComps()}</Box>;
};

export default Alerts;
