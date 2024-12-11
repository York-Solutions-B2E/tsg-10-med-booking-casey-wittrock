import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  AppBar,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Tab,
  Tabs,
} from "@mui/material";

import formatTimeString from "../../../helpers/formatTimeString";
import formattedDateString from "../../../helpers/formattedDate";

import { useNavigate } from "react-router-dom";
import { TabContext } from "@mui/lab";

const TAB_OPTIONS = ["upcoming", "past", "cancelled", "completed", "all"];

const AppointmentTable = ({ appointments }) => {
  const [filterTab, setFilterTab] = useState("upcoming");
  const navigate = useNavigate();

  const columns = [
    { field: "date", headerName: "Date", width: 150, editable: false },
    { field: "time", headerName: "Time", width: 100, editable: false },
    { field: "doctor", headerName: "Doctor", width: 150, editable: false },
    { field: "type", headerName: "Type", width: 150, editable: false },
    { field: "duration", headerName: "Duration", width: 150, editable: false },
    {
      field: "action",
      headerName: "",
      width: 75,
      editable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => navigate(`/appointments/${params.row.id}`)}>
            View
          </Button>
        );
      },
    },
  ];

  const rows = appointments
    .filter((appt) => {
      if (filterTab === "upcoming") {
        return new Date(appt.date) >= new Date();
      } else if (filterTab === "past") {
        return new Date(appt.date) < new Date();
      } else if (filterTab === "cancelled") {
        return appt.status === "CANCELLED";
      } else if (filterTab === "completed") {
        return appt.status === "COMPLETED";
      } else {
        return true;
      }
    })
    .map((appt) => {
      return {
        id: appt.id,
        date: formattedDateString(appt.date),
        time: formatTimeString(appt.time),
        doctor: `Dr. ${appt.doctorName}`,
        type: appt.type
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        duration: "30 minutes",
      };
    });

  const tabs = TAB_OPTIONS.map((tab) => <Tab value={tab} label={tab} />);

  return (
    <Box className="w-[50rem]">
      <AppBar position="static">
        <Box className="flex justify-around">
          <Tabs
            value={filterTab}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={(e, v) => setFilterTab(v)}
          >
            {tabs}
          </Tabs>
        </Box>
      </AppBar>
      {appointments.length !== 0 ? (
        <DataGrid
          localeText={{
            noRowsLabel: "No appointments to show!",
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
        />
      ) : (
        <h1>No appointments</h1>
      )}
    </Box>
  );
};

export default AppointmentTable;
