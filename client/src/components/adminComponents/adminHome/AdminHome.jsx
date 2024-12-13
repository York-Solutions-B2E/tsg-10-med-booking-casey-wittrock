import React from "react";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Card>
        <CardHeader title="Admin Actions" />
        <CardContent className="flex justify-center flex-wrap gap-5">
          <Button
            variant="contained"
            className="h-[5rem] w-[15rem]"
            color="primary"
            onClick={() => navigate("/admin/doctors")}
          >
            Edit Doctors
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="h-[5rem] w-[15rem]"
            onClick={() => navigate("/admin/specialties")}
          >
            Edit Specialties
          </Button>
          <Button
            className="h-[5rem] w-[15rem]"
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/patients")}
          >
            Edit Patients
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
