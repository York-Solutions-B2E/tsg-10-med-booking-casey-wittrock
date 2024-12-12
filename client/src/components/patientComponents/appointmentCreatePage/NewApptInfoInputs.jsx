import React from "react";

import formatTypeString from "../../../helpers/formatTypeString";

import { Select, TextField, MenuItem, InputLabel } from "@mui/material";

const NewApptInfoInputs = ({ apptInfo, onChange }) => {
  const typeOptions = ["IN_PERSON", "VIRTUAL"];
  return (
    <div>
      <InputLabel id="appt">Appointment Type</InputLabel>
      <Select
        labelId="appt"
        value={apptInfo.type}
        name="type"
        className="w-[15rem]"
        onChange={onChange}
      >
        <MenuItem value={0}>- Select Appt Type -</MenuItem>
        {typeOptions.map((option) => (
          // regex to change "IN_PERSON" or "VIRTUAL" to "In Person" or "Virtual"
          <MenuItem value={option}>{formatTypeString(option)}</MenuItem>
        ))}
      </Select>
      <TextField
        placeholder="What is the reason for your appointment"
        value={apptInfo.reason}
        name="reason"
        className="w-[35rem] ml-2"
        onChange={onChange}
      />
    </div>
  );
};

export default NewApptInfoInputs;
