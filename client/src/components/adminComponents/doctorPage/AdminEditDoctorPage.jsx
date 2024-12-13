import React, { useState, useEffect } from "react";
import useAdminContext from "../../../hooks/useAdminContext";
import { useParams } from "react-router-dom";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useAppContext from "../../../hooks/useAppContext";

const AdminEditDoctorPage = () => {
  const [doctorData, setDoctorData] = useState({});
  const params = useParams();
  console.log(params.id);
  const { doctors, specializations, handleUpdateDoctor } = useAdminContext();
  const { loading, setAlert } = useAppContext();

  useEffect(() => {
    if (doctors.length !== 0 && specializations.length !== 0) {
      const doctor = doctors.find(
        (doctor) => doctor.id === parseInt(params.id)
      );
      console.log(doctor);
      setDoctorData({ ...doctor });
    }
  }, []);

  const onChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {doctors && (
        <Card>
          <CardHeader title="Edit Doctor" />
          <CardContent className="flex flex-col gap-5">
            <TextField
              label="First Name"
              value={doctorData.firstName}
              fullWidth
              name="firstName"
              onChange={onChange}
              variant="outlined"
            />
            <TextField
              label="Last Name"
              value={doctorData.lastName}
              fullWidth
              onChange={onChange}
              name="lastName"
              variant="outlined"
            />
            <TextField
              label="Email"
              value={doctorData.email}
              fullWidth
              onChange={onChange}
              name="email"
              variant="outlined"
            />
            <TextField
              label="Phone"
              value={doctorData.phone}
              fullWidth
              onChange={onChange}
              variant="outlined"
              name="phone"
            />
            <Select
              label="Specialization"
              value={doctorData.specializationId}
              fullWidth
              name="specializationId"
              onChange={onChange}
              variant="outlined"
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization.id} value={specialization.id}>
                  {specialization.name}
                </MenuItem>
              ))}
            </Select>
          </CardContent>
          <CardActionArea>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={() => handleUpdateDoctor(doctorData.id, doctorData)}
              loading={loading}
            >
              Save
            </LoadingButton>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
};

export default AdminEditDoctorPage;
