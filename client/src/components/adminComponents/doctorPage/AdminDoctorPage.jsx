import React, { useState } from "react";
import useAppContext from "../../../hooks/useAppContext";
import useAdminContext from "../../../hooks/useAdminContext";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Button,
  ToggleButton,
  TextField,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useDisclosure from "../../../hooks/useDisclosure";

const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  specializationId: 0,
};

const AdminDoctorPage = () => {
  const [adding, setAdding] = useState(false);
  const [addDoctorInfo, setAddDoctorInfo] = useState(INITIAL_DATA);
  const [isValid, setIsValid] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const navigate = useNavigate();
  const { doctors, specializations, handleCreateDoctor, handleDeleteDoctor } =
    useAdminContext();
  const { loading, setAlert } = useAppContext();
  const confirmDeleteDisc = useDisclosure();
  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 150, editable: false },
    {
      field: "specialization",
      headerName: "Specialization",
      width: 150,
      editable: false,
    },
    { field: "phone", headerName: "Phone", width: 150, editable: false },
    { field: "email", headerName: "Email", width: 230, editable: false },
    { field: "address", headerName: "Address", width: 200, editable: false },
    {
      field: "edit",
      headerName: "",
      width: 100,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => navigate(`/admin/doctors/${params.row.id}`)}>
            View/Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setSelectedDoctorId(params.row.id);
              confirmDeleteDisc.open();
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const rows = doctors.map((doctor) => ({
    id: doctor.id,
    name: `Dr. ${doctor.firstName} ${doctor.lastName}`,
    specialization: doctor.specialization,
    phone: doctor.phone,
    email: doctor.email,
    address: doctor.address,
  }));

  const selectOptions = specializations.map((specialization) => (
    <MenuItem key={specialization.id} value={specialization.id}>
      {specialization.name}
    </MenuItem>
  ));

  const handleChange = (e) => {
    const newInfo = { ...addDoctorInfo, [e.target.name]: e.target.value };
    setIsValid(checkValid(newInfo));
    setAddDoctorInfo(newInfo);
  };

  const checkValid = (info) => {
    return Object.values(info).every((value) => {
      // check if value is a number
      if (typeof value === "number") {
        return value !== 0;
      } else {
        return value !== "";
      }
    });
  };

  return (
    <div>
      {doctors.length !== 0 && specializations.length !== 0 && (
        <>
          <Card>
            <CardHeader title="Doctors" />
            <CardContent className="h-[450px]">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </CardContent>
            <CardActionArea className="flex justify-between items-center">
              <ToggleButton
                onClick={() => setAdding(!adding)}
                selected={adding}
                value="check"
                color="secondary"
                className="ml-5"
                disabled={adding}
              >
                Add a Doctor
              </ToggleButton>
              {adding && (
                <>
                  <LoadingButton
                    loading={loading}
                    onClick={async () => {
                      await handleCreateDoctor(addDoctorInfo);
                      setAdding(false);
                    }}
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                  >
                    Add
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => setAdding(false)}
                    variant="contained"
                    color="secondary"
                    loading={loading}
                  >
                    Cancel
                  </LoadingButton>
                </>
              )}
            </CardActionArea>
            {adding && (
              <CardContent>
                <Card>
                  <CardHeader title="Add Doctor" />
                  <CardContent className="flex flex-row gap-5">
                    <TextField
                      className="w-[23rem]"
                      label="First Name"
                      name="firstName"
                      value={addDoctorInfo.firstName}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      className="w-[23rem]"
                      label="Last Name"
                      name="lastName"
                      value={addDoctorInfo.lastName}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      className="w-[23rem]"
                      label="Email"
                      name="email"
                      value={addDoctorInfo.email}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      label="Phone"
                      className="w-[23rem]"
                      name="phone"
                      value={addDoctorInfo.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      className="w-[23rem]"
                      label="Address"
                      name="address"
                      value={addDoctorInfo.address}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <Select
                      className="w-[23rem]"
                      label="Specialization"
                      name="specializationId"
                      value={addDoctorInfo.specializationId}
                      onChange={handleChange}
                      variant="outlined"
                    >
                      <MenuItem value={0}>Select Specialization</MenuItem>
                      {selectOptions}
                    </Select>
                  </CardContent>
                </Card>
              </CardContent>
            )}
          </Card>
        </>
      )}
      <Modal open={confirmDeleteDisc.isOpen} onClose={confirmDeleteDisc.close}>
        <Card>
          <CardHeader title="Confirm Delete" />
          <CardContent>
            <p>Are you sure you want to delete this doctor?</p>
          </CardContent>
          <CardActionArea>
            <Button
              onClick={async () => {
                await handleDeleteDoctor(selectedDoctorId);
                setAlert({ open: true, message: "Doctor deleted" });
                setSelectedDoctorId(null);
                confirmDeleteDisc.close();
              }}
            >
              Yes
            </Button>
            <Button onClick={confirmDeleteDisc.close}>No</Button>
          </CardActionArea>
        </Card>
      </Modal>
    </div>
  );
};

export default AdminDoctorPage;
