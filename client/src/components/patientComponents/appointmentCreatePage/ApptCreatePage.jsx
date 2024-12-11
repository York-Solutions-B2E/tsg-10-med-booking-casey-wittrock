import React, { useState, useEffect } from "react";

import { Button, Input, Select, MenuItem, ToggleButton } from "@mui/material";

import { useNavigate } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import useDisclosure from "../../../hooks/useDisclosure";
import SubmitAppointmentModal from "./SubmitAppointmentModal";

import formatTimeString from "../../../helpers/formatTimeString";

import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  AssignmentTurnedInRounded,
} from "@mui/icons-material";

import dayjs from "dayjs";
import NewApptDoctorSchedule from "./NewApptDoctorSchedule";
import NewApptInfoInputs from "./NewApptInfoInputs";

const INITIAL_DATA = {
  reason: "",
  type: "",
};

const ApptCreatePage = () => {
  const [newApptInfo, setNewApptInfo] = useState(INITIAL_DATA);
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(0);
  const [selectedDoctorId, setSelectedDoctorId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState(0);
  const [menuIdx, setMenuIdx] = useState(0);

  const submitModalDisc = useDisclosure();

  const { handleGetDoctorsAndSpecializations, handleSubmitAppointment } =
    useAppContext();

  useEffect(() => {
    const getDoctors = async () => {
      const { doctorsData, specializationsData } =
        await handleGetDoctorsAndSpecializations();
      console.log(doctorsData);
      setDoctors(doctorsData);
      setSpecializations(specializationsData);
    };
    if (doctors.length === 0 || specializations.length === 0) {
      getDoctors();
    }
  }, [doctors]);

  const handleInputChange = (e) => {
    setNewApptInfo({
      ...newApptInfo,
      [e.target.name]: e.target.value,
    });
    console.log(newApptInfo);
  };

  const handleChange = (e) => {
    const id = e.target.value;
    if (e.target.name == "specialization") {
      setSelectedDoctorId(0);
      setSelectedSpecializationId(id);
      setSlots([]);
      setSelectedSlotId(0);
    } else if (e.target.name == "doctor") {
      setSelectedDoctorId(id);
      setSelectedSlotId(0);
      const selectedDoctor = doctors.find((doc) => doc.id === id);
      setSlots(id !== 0 ? selectedDoctor.slots : []);
    }
  };

  const handleDateChange = (date) => setSelectedDate(date);

  const submit = () => {
    handleSubmitAppointment(selectedSlotId, newApptInfo);
  };

  const specializationSelectItems = [
    <MenuItem value={0}>- Select a Specialization -</MenuItem>,
    ...specializations.map((spec) => (
      <MenuItem value={spec.id}>{spec.name}</MenuItem>
    )),
  ];

  const doctorSelectItems = [
    <MenuItem value={0}>- Select a Doctor -</MenuItem>,
    ...doctors
      .filter((doc) => doc.specializationId === selectedSpecializationId)
      .map((doc) => (
        <MenuItem value={doc.id}>
          Dr. {doc.firstName} {doc.lastName}
        </MenuItem>
      )),
  ];

  const slotToggleButtons = slots
    .filter((slot) => {
      if (selectedDate === null) {
        return false;
      }
      const [year, month, day] = slot.date.split("-").map(Number);
      return (
        new Date(year, month - 1, day).toISOString() ==
        selectedDate.toISOString()
      );
    })
    .map((slot) => (
      <ToggleButton
        value={slot.id}
        selected={slot.id === selectedSlotId}
        onChange={() =>
          setSelectedSlotId(selectedSlotId !== slot.id ? slot.id : 0)
        }
      >
        {formatTimeString(slot.time)}
      </ToggleButton>
    ));

  const allowedDates = Array.from(new Set(slots.map((slot) => slot.date))).map(
    (date) => dayjs(date)
  );

  return (
    <>
      <SubmitAppointmentModal
        disclosure={submitModalDisc}
        apptInfo={newApptInfo}
        doctor={doctors.find((doc) => doc.id === selectedDoctorId) || null}
        slot={slots.find((slot) => slot.id === selectedSlotId) || null}
        submit={submit}
      />
      <div>
        <h1>Create an appointment</h1>
        {menuIdx === 0 ? (
          <NewApptInfoInputs
            onChange={handleInputChange}
            apptInfo={newApptInfo}
          />
        ) : menuIdx === 1 ? (
          <NewApptDoctorSchedule
            onChange={handleDateChange}
            allowedDates={allowedDates}
            date={selectedDate}
            specializationOptions={specializationSelectItems}
            doctorOptions={doctorSelectItems}
            onSelectChange={handleChange}
            selectedDrId={selectedDoctorId}
            selectedSpecId={selectedSpecializationId}
            availableSlots={slotToggleButtons}
          />
        ) : null}
        <Button
          startIcon={<ArrowBackIosNewRounded />}
          disabled={menuIdx === 0}
          onClick={() => setMenuIdx(0)}
        >
          Back
        </Button>
        <Button
          disabled={
            (selectedSlotId === 0 && menuIdx === 1) ||
            ((newApptInfo.type === "" || newApptInfo.reason === "") &&
              menuIdx === 0)
          }
          onClick={() => {
            if (menuIdx === 0) {
              setMenuIdx(1);
            } else {
              submitModalDisc.open();
            }
          }}
          endIcon={
            menuIdx === 0 ? (
              <ArrowForwardIosRounded />
            ) : (
              <AssignmentTurnedInRounded />
            )
          }
        >
          {menuIdx === 0 ? "Next" : "Review"}
        </Button>
      </div>
    </>
  );
};

export default ApptCreatePage;