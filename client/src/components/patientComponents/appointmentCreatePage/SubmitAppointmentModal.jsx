import React from "react";
import { Modal, Button, Box } from "@mui/material";

const SubmitAppointmentModal = ({
  apptInfo,
  slot,
  doctor,
  disclosure,
  submit,
}) => {
  return (
    <Modal open={disclosure.isOpen} onClose={disclosure.close}>
      <Box className="w-[300px] m-auto bg-white rounded-lg p-10">
        {doctor && slot && apptInfo && (
          <div className="flex-col justify-items-center">
            <h2>Appointment Summary</h2>
            <p>{doctor.specialization}</p>
            <p>Date: {slot.date}</p>
            <p>Time: {slot.time}</p>
            <p>Duration: {slot.duration}</p>
            <p>Type: {apptInfo.type}</p>
            <p>Doctor: {`Dr. ${doctor.firstName} ${doctor.lastName}`}</p>
            <Button onClick={submit}>Submit</Button>
            <Button onClick={disclosure.close}>Cancel</Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default SubmitAppointmentModal;
