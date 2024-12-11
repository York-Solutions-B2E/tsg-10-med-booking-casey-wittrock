import React, { useEffect, useState } from "react";

import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

import useAppContext from "../../../hooks/useAppContext";

// Initial data for the form

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  dob: null,
};

const INITIAL_ERRORS = {
  firstName: {
    error: false,
    message: "",
  },
  lastName: {
    error: false,
    message: "",
  },
  email: {
    error: false,
    message: "",
  },
  phone: {
    error: false,
    message: "",
  },
  address: {
    error: false,
    message: "",
  },
};

// Initial data for the select options

const SELECT_OPTIONS = ["Male", "Female"];

const PateintCreatePage = () => {
  const { handleCreateProfile, loading, setAlert, user } = useAppContext();

  const [info, setInfo] = useState({ ...INITIAL_DATA, email: user.username });
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  useEffect(() => {
    setAlert({
      severity: "warning",
      message: "Please create your patient profile.",
    });
  }, []);

  const handleTextFieldChange = (e) => {
    const newInfo = { ...info, [e.target.name]: e.target.value };
    // validate the form. Make sure email is valid email format, phone is a valid phone number, and all fields are filled out
    setInfo(newInfo);

    setValid(formIsValid(newInfo, errors));
  };

  const formIsValid = (data = info, errorsCheck = errors) =>
    data.firstName != "" &&
    data.lastName != "" &&
    data.email != "" &&
    data.email.includes("@") &&
    data.email.includes(".") &&
    errorsCheck.email.error == false &&
    errorsCheck.phone.error == false &&
    data.phone != "" &&
    (data.phone != "" || data.phone.length == 10) &&
    data.address != "" &&
    data.dob != null &&
    data.gender != "";

  const validateInput = (e) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const message =
      name === "phone" ? "Invalid phone number" : "Invalid email format";
    const matches = emailRegex.test(value) || phoneRegex.test(value);
    if (!matches) {
      setValid(false);
      setErrors({
        ...errors,
        [name]: { error: true, message: message },
      });
    } else {
      const errorsObj = { ...errors, [name]: { error: false, message: "" } };
      setErrors(errorsObj);
      setValid(formIsValid(info, errorsObj));
    }
  };

  const SelectItems = SELECT_OPTIONS.map((option) => (
    <MenuItem value={option.toUpperCase()}>{option}</MenuItem>
  ));

  return (
    <div>
      <h2>Create a Patient Profile</h2>
      <TextField
        required
        placeholder="First Name"
        value={info.firstName}
        onChange={handleTextFieldChange}
        name="firstName"
      />
      <TextField
        required
        placeholder="Last Name"
        value={info.lastName}
        onChange={handleTextFieldChange}
        name="lastName"
      />
      <TextField
        required
        onBlur={validateInput}
        error={errors.email.error}
        helperText={errors.email.message}
        type="email"
        placeholder="Email"
        value={info.email}
        onChange={handleTextFieldChange}
        name="email"
      />
      <TextField
        placeholder="Phone"
        onBlur={validateInput}
        error={errors.phone.error}
        helperText={errors.phone.message}
        value={info.phone}
        onChange={handleTextFieldChange}
        name="phone"
      />
      <TextField
        placeholder="Address"
        value={info.address}
        onChange={handleTextFieldChange}
        name="address"
      />
      <DatePicker
        value={info.dob}
        inputFormat="yyyy.MM.dd"
        onChange={(date) => setInfo({ ...info, dob: date })}
        name="dob"
        views={["year", "month", "day"]}
        openTo="year"
        disableFuture
      />
      <InputLabel id="gender-select-label">Gender</InputLabel>
      <Select
        labelId="gender-select-label"
        id="gender-select"
        label="Gender"
        name="gender"
        placeholder="Select a gender"
        value={info.gender}
        onChange={handleTextFieldChange}
      >
        <MenuItem value="">- Select a gender -</MenuItem>
        {SelectItems}
      </Select>
      <LoadingButton
        loading={loading}
        onClick={() => {
          handleCreateProfile({ ...info, dob: info.dob.toISOString() });
        }}
        disabled={loading || !valid}
      >
        Create Profile
      </LoadingButton>
    </div>
  );
};

export default PateintCreatePage;
