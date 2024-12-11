import React from "react";

import { Select, TextField, MenuItem } from "@mui/material";

const NewApptInfoInputs = ({ apptInfo, onChange }) => {
  const typeOptions = ["IN_PERSON", "VIRTUAL"];
  return (
    <div>
      <Select value={apptInfo.type} name="type" onChange={onChange}>
        <MenuItem value="">- Select Appt Type -</MenuItem>
        {typeOptions.map((option) => (
          // regex to change "IN_PERSON" or "VIRTUAL" to "In Person" or "Virtual"
          <MenuItem value={option}>
            {option
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </MenuItem>
        ))}
      </Select>
      <TextField
        placeholder="Reason for Appointment"
        value={apptInfo.reason}
        name="reason"
        onChange={onChange}
      />
    </div>
  );
};

export default NewApptInfoInputs;
