import React, { useEffect, useState } from "react";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

import useAppContext from "../../../hooks/useAppContext";

// Initial data for the form

const INITIAL_DATA = {
  phone: "",
  address: "",
  gender: "",
  dob: null,
};

const INITIAL_ERRORS = {
  email: {
    error: false,
    message: "",
  },
  phone: {
    error: false,
    message: "",
  },
};

// Initial data for the select options

const SELECT_OPTIONS = ["Male", "Female"];

const PateintCreatePage = () => {
  const { handleCreateProfile, loading, setAlert, user } = useAppContext();

  const [info, setInfo] = useState({
    ...INITIAL_DATA,
    email: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });
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
    const isValid = formIsValid(newInfo, errors);
    console.log(isValid);

    setValid(formIsValid(newInfo, errors));
  };

  const handleDateChange = (date) => {
    const newInfo = { ...info, dob: date };
    setValid(formIsValid(newInfo, errors));
    setInfo(newInfo);
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
    <div className="flex-col justify-items-center">
      <h2>Create your patient Profile</h2>
      <div className="flex-col bg-slate-50 p-10 rounded-xl drop-shadow-md">
        <div className="flex">
          <div className="grid-cols-1 w-[12rem] p-10">
            <TextField
              required
              className="m-3"
              placeholder="First Name"
              value={info.firstName}
              onChange={handleTextFieldChange}
              name="firstName"
            />
            <TextField
              className="m-3"
              required
              placeholder="Last Name"
              value={info.lastName}
              onChange={handleTextFieldChange}
              name="lastName"
            />
            <TextField
              className="m-3"
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
              className="m-3"
              placeholder="Phone"
              onBlur={validateInput}
              error={errors.phone.error}
              helperText={errors.phone.message}
              value={info.phone}
              onChange={handleTextFieldChange}
              name="phone"
            />
            <TextField
              className="m-3"
              placeholder="Address"
              value={info.address}
              onChange={handleTextFieldChange}
              name="address"
            />
          </div>
          <div className="flex-col w-[12rem]  p-10">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              className="w-[10rem]"
              id="gender-select"
              label="Gender"
              name="gender"
              value={info.value}
              onChange={handleTextFieldChange}
            >
              {SelectItems}
            </Select>
            <DatePicker
              className="mt-3"
              value={info.dob}
              inputFormat="yyyy.MM.dd"
              onChange={handleDateChange}
              name="dob"
              views={["year", "month", "day"]}
              openTo="year"
              disableFuture
            />
          </div>
        </div>
        <div className="ml-5">
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => {
              handleCreateProfile({ ...info, dob: info.dob.toISOString() });
            }}
            disabled={loading || !valid}
          >
            Create Profile
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default PateintCreatePage;
