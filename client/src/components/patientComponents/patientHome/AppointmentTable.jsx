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
import formatTypeString from "../../../helpers/formatTypeString";

import { useNavigate } from "react-router-dom";
import { TabContext } from "@mui/lab";

const TAB_OPTIONS = ["upcoming", "past", "canceled", "completed", "all"];

const AppointmentTable = ({ appointments }) => {
  const [filterTab, setFilterTab] = useState("upcoming");
  const navigate = useNavigate();

  const columns = [
    { field: "date", headerName: "Date", width: 150, editable: false },
    { field: "time", headerName: "Time", width: 100, editable: false },
    { field: "doctor", headerName: "Doctor", width: 150, editable: false },
    { field: "type", headerName: "Type", width: 110, editable: false },
    { field: "status", headerName: "Status", width: 150, editable: false },
    {
      field: "action",
      headerName: "",
      width: 110,
      editable: false,
      sortable: false,
      filterable: false,
      hideable: false,
      manageable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => navigate(`/appointments/${params.row.id}`)}>
            View/Edit
          </Button>
        );
      },
    },
  ];

  const rows = appointments
    .filter((appt) => {
      if (filterTab === "upcoming") {
        return new Date(appt.date) >= new Date() && appt.status !== "CANCELED";
      } else if (filterTab === "past") {
        return new Date(appt.date) < new Date();
      } else if (filterTab === "canceled") {
        return appt.status === "CANCELED";
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
        type: formatTypeString(appt.type),
        status: appt.status,
      };
    });

  const tabs = TAB_OPTIONS.map((tab) => <Tab value={tab} label={tab} />);

  return (
    <div className="w-[50rem] drop-shadow-xl">
      <AppBar position="static" className=" bg-blue-300 rounded-t-xl">
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
      <DataGrid
        className="rounded-b-xl"
        localeText={{
          noRowsLabel: "No appointments to show!",
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
};

export default AppointmentTable;
