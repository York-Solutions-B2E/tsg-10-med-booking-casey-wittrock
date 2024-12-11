import React from "react";
import { Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
const NewApptDoctorSchedule = ({
  onChange,
  allowedDates,
  date,
  selectedSpecId,
  selectedDrId,
  onSelectChange,
  specializationOptions,
  doctorOptions,
  availableSlots,
}) => {
  const shouldDisableDate = (date) => {
    return !allowedDates.some((allowedDate) => allowedDate.isSame(date, "day"));
  };

  return (
    <>
      <Select
        value={selectedSpecId}
        onChange={onSelectChange}
        name="specialization"
        style={{ width: "200px" }}
      >
        {specializationOptions}
      </Select>
      <Select
        value={selectedDrId}
        disabled={selectedSpecId === 0}
        onChange={onSelectChange}
        name="doctor"
        style={{ width: "200px" }}
      >
        {doctorOptions}
      </Select>
      {selectedDrId === 0 ? (
        <div>Please select a doctor</div>
      ) : (
        <DatePicker
          value={date}
          inputFormat="yyyy.MM.dd"
          onChange={onChange}
          views={["year", "month", "day"]}
          name="date"
          openTo="year"
          disablePast
          shouldDisableDate={shouldDisableDate}
        />
      )}
      {availableSlots.length != 0 && <div>{availableSlots}</div>}
    </>
  );
};

export default NewApptDoctorSchedule;
