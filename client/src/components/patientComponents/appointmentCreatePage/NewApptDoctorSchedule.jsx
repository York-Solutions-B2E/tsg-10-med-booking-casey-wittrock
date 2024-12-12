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
  apptCheck,
}) => {
  const shouldDisableDate = (date) => {
    return !allowedDates.some((allowedDate) => allowedDate.isSame(date, "day"));
  };

  return (
    <div className="mt-5 justify-items-center">
      <Select
        className="m-2"
        value={selectedSpecId}
        onChange={onSelectChange}
        name="specialization"
        style={{ width: "200px" }}
      >
        {specializationOptions}
      </Select>
      <Select
        className="m-2"
        value={selectedDrId}
        disabled={selectedSpecId === 0}
        onChange={onSelectChange}
        name="doctor"
        style={{ width: "200px" }}
      >
        {doctorOptions}
      </Select>
      {selectedDrId === 0 ? null : (
        <div className="m-2 flex justify-items-center">
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
        </div>
      )}
      {availableSlots.length != 0 && (
        <div className="w-[30rem]">{availableSlots}</div>
      )}
    </div>
  );
};

export default NewApptDoctorSchedule;
