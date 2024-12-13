import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import {
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAppContext from "../../../hooks/useAppContext";

import dayjs from "dayjs";

import formatTimeString from "../../../helpers/formatTimeString";

const RescheduleCalendar = ({ setAppt, appt, isOpen }) => {
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const {
    loading,
    handleGetDoctor,
    handleRescheduleAppointment,
    appointments,
  } = useAppContext();

  let slotToggleButtons = slots
    .filter((slot) => {
      if (selectedDate === null) {
        return false;
      }
      const [year, month, day] = slot.date.split("-").map(Number);
      return (
        new Date(year, month - 1, day).toISOString() ==
          selectedDate.toISOString() &&
        !appointments.some(
          (appt) => appt.time === slot.time && appt.date === slot.date
        )
      );
    })
    .map((slot) => (
      <ToggleButton
        className="w-[15rem]"
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

  useEffect(() => {
    const getDoctor = async () => {
      const doctorData = await handleGetDoctor(appt.doctorId);

      console.log(doctorData);
      setDoctor(doctorData);
      setSlots(doctorData.slots);
    };
    if (!doctor) {
      getDoctor();
    }
  }, []);

  return (
    <>
      {doctor ? (
        <div>
          <Card>
            <CardHeader title="Reschedule Appointment" />
            <CardContent>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                views={["year", "month", "day"]}
                name="date"
                openTo="year"
                disablePast
                shouldDisableDate={(date) =>
                  !allowedDates.some((allowedDate) =>
                    allowedDate.isSame(date, "day")
                  )
                }
              />
              <ToggleButtonGroup
                value={selectedSlotId}
                className="flex flex-wrap"
                onChange={(e, slotId) =>
                  setSelectedSlotId(slotId === selectedSlotId ? 0 : slotId)
                }
              >
                {slotToggleButtons}
              </ToggleButtonGroup>
            </CardContent>
            <CardActionArea className="p-5">
              <LoadingButton
                onClick={async () => {
                  const newAppt = await handleRescheduleAppointment(
                    appt.id,
                    selectedSlotId
                  );
                  setAppt(newAppt);
                  isOpen(false);
                }}
                disabled={selectedSlotId === null}
              >
                Reschedule
              </LoadingButton>
              <LoadingButton onClick={() => isOpen(false)}>
                Cancel
              </LoadingButton>
            </CardActionArea>
          </Card>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default RescheduleCalendar;
