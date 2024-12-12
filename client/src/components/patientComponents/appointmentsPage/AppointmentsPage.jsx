import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  MenuItem,
  TextField,
  Button,
  CardContent,
  CardHeader,
  CardActionArea,
  ToggleButton,
  CardActions,
  InputLabel,
  Modal,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { useParams } from "react-router-dom";

import useAppContext from "../../../hooks/useAppContext";
import { LoadingButton } from "@mui/lab";
import formattedDateString from "../../../helpers/formattedDate";
import formatTimeString from "../../../helpers/formatTimeString";
import formatTypeString from "../../../helpers/formatTypeString";

import useDisclosure from "../../../hooks/useDisclosure";

const TYPE_OPTIONS = ["IN_PERSON", "VIRTUAL"];

const AppointmentsPage = () => {
  const {
    loading,
    appointments,
    handleCancelOrConfirmAppointment,
    handleUpdateAppointment,
  } = useAppContext();
  const { id } = useParams();
  const apptIdInt = parseInt(id);

  const [appt, setAppt] = useState(null);
  const [editInfo, setEditInfo] = useState({ reason: "", type: "" });
  const [editing, setEditing] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);

  const confirmCancelDisc = useDisclosure();

  const handleEdit = (e) => {
    setEditInfo({ ...appt, [e.target.name]: e.target.value });
  };

  const isApptToday = (appt) => {
    const apptDate = new Date(appt.date);
    const today = new Date();
    return (
      apptDate.getDate() === today.getDate() &&
      apptDate.getMonth() === today.getMonth() &&
      apptDate.getFullYear() === today.getFullYear()
    );
  };

  const isApptPast = (appt) => {
    const apptDate = new Date(appt.date);
    const today = new Date();
    return apptDate < today;
  };

  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: "black", // Style root
            },
          },
          input: {
            "&.Mui-disabled": {
              WebkitTextFillColor: "black !important", // Style input text
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    console.log(id);
    console.log(apptIdInt);
    if (apptIdInt && appointments.length > 0) {
      const appointment = appointments.find((appt) => appt.id === apptIdInt);
      setAppt(appointment);
      setEditInfo({ reason: appointment.reason, type: appointment.type });
    }
  }, []);

  // return cards. If editing, the reason and type of the appointment can be edited while still displaying all the other appt info and there will only be a save or cancel button(the cancel button just reverts back to previous information and sets editing to false). If the appointment is today, the appointment can be confirmed with a button. There is also a cancel button. The card should display the date, time, doctors name, reason, type, status, and specialization.
  return (
    <>
      {appt && (
        <Card>
          <CardHeader title="Appointment Information" />
          <CardContent>
            <ThemeProvider theme={theme}>
              <TextField
                className="h-[5rem]"
                name="reason"
                label="Reason"
                value={editing ? editInfo.reason : appt.reason}
                disabled={!editing}
                onChange={handleEdit}
                fullWidth
                variant={editing ? "outlined" : "standard"}
              />
              <Select
                className="h-[3rem] w-[10rem] m-1"
                labelId="select-label"
                name="type"
                variant={editing ? "outlined" : "standard"}
                value={editing ? editInfo.type : appt.type}
                disabled={!editing}
                onChange={handleEdit}
              >
                {TYPE_OPTIONS.map((type) => (
                  <MenuItem key={type} value={type}>
                    {formatTypeString(type)}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Date"
                variant="standard"
                className="m-1"
                disabled
                value={formattedDateString(appt.date)}
              />
              <TextField
                className="m-1"
                label="Time"
                variant="standard"
                disabled
                value={formatTimeString(appt.time)}
              />
              <TextField
                className="m-1"
                label="Doctor"
                variant="standard"
                disabled
                value={`Dr. ${appt.doctorName}`}
              />
              <TextField
                className="m-1"
                label="Status"
                variant="standard"
                disabled
                value={appt.status}
              />
              <TextField
                className="m-1"
                label="Specialization"
                disabled
                variant="standard"
                value={appt.specialization}
              />
              <TextField
                className="m-1"
                label="Duration"
                variant="standard"
                disabled
                value={appt.duration}
              />
            </ThemeProvider>
          </CardContent>
          <CardActionArea>
            <CardActions>
              <Button
                disabled={
                  appt.status === "CONFIRMED" ||
                  appt.status === "CANCELED" ||
                  !isApptToday(appt) ||
                  isApptPast(appt) ||
                  editing
                }
                onClick={() => {
                  handleCancelOrConfirmAppointment(appt.id, "CONFIRMED");
                }}
              >
                Confirm Appointment
              </Button>
              <Button
                disabled={
                  appt.status === "CONFIRMED" ||
                  appt.status === "CANCELED" ||
                  isApptPast(appt) ||
                  editing ||
                  rescheduling
                }
                onClick={() => confirmCancelDisc.open()}
              >
                Cancel Appointment
              </Button>
            </CardActions>
            <ToggleButton
              selected={rescheduling}
              disabled={
                appt.status === "CONFIRMED" ||
                appt.status === "CANCELED" ||
                isApptPast(appt) ||
                isApptToday(appt) ||
                rescheduling ||
                editing
              }
              onClick={() => {
                setRescheduling(!rescheduling);
              }}
            >
              Reschedule
            </ToggleButton>
            <ToggleButton
              selected={editing}
              disabled={
                appt.status === "CONFIRMED" ||
                appt.status === "CANCELED" ||
                isApptPast(appt) ||
                isApptToday(appt) ||
                editing ||
                rescheduling
              }
              onClick={() => {
                setEditing(!editing);
              }}
            >
              Edit
            </ToggleButton>
            {editing && (
              <>
                <LoadingButton
                  loading={loading}
                  onClick={() => {
                    setAppt({ ...appt, ...editInfo });
                    handleUpdateAppointment(appt.id, editInfo);
                    setEditing(false);
                  }}
                >
                  Save Changes
                </LoadingButton>
                <LoadingButton
                  loading={loading}
                  onClick={() => {
                    setEditInfo({ reason: appt.reason, type: appt.type });
                    setEditing(false);
                  }}
                >
                  Cancel
                </LoadingButton>
              </>
            )}
          </CardActionArea>
          <CardContent>
            {rescheduling && (
              <TextField
                label="New Date"
                variant="standard"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            )}
          </CardContent>
        </Card>
      )}
      <Modal open={confirmCancelDisc.isOpen} onClose={confirmCancelDisc.close}>
        <Card className="w-[30rem] m-auto align-middle">
          <CardHeader title="Confirm Cancel" />
          <CardContent>
            <p>Are you sure you want to cancel this appointment?</p>
          </CardContent>
          <CardActionArea>
            <Button
              onClick={() => {
                handleCancelOrConfirmAppointment(appt.id, "CANCELED");
                const newAppt = { ...appt, status: "CANCELED" };
                setAppt(newAppt);
                confirmCancelDisc.close();
              }}
            >
              Yes
            </Button>
            <Button onClick={confirmCancelDisc.close}>No</Button>
          </CardActionArea>
        </Card>
      </Modal>
    </>
  );
};

export default AppointmentsPage;
