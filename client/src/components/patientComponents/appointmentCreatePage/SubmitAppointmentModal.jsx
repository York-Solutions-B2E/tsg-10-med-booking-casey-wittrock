import React from "react";
import {
  Modal,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

import formatTimeString from "../../../helpers/formatTimeString";
import formattedDateString from "../../../helpers/formattedDate";

const SubmitAppointmentModal = ({
  apptInfo,
  slot,
  doctor,
  disclosure,
  submit,
}) => {
  return (
    <Modal open={disclosure.isOpen} onClose={disclosure.close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 1,
        }}
      >
        {doctor && slot && apptInfo && disclosure && submit && (
          <Card>
            <CardHeader title="Confirm Appointment" />
            <CardContent>
              <Typography variant="h6">
                Dr. {doctor.firstName} {doctor.lastName}
              </Typography>
              <Typography variant="body1">
                {formattedDateString(slot.date)} at{" "}
                {formatTimeString(slot.time)}.
              </Typography>
              <Typography variant="body2">{doctor.specialization}</Typography>
              <Typography variant="body2">Reason: {apptInfo.reason}</Typography>
            </CardContent>
            <CardActionArea>
              <Button onClick={submit}>Confirm</Button>
              <Button onClick={disclosure.close}>Cancel</Button>
            </CardActionArea>
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default SubmitAppointmentModal;
