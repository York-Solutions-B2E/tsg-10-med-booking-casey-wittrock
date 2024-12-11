import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import RegisterPatientRoutes from "./routes/RegisterPatientRoutes";

const Router = ({ isLoggedIn, isAdmin, isRegistered }) => {
  return (
    <>
      {isLoggedIn && isAdmin ? (
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      ) : isLoggedIn && isRegistered ? (
        <PatientRoutes />
      ) : isLoggedIn && !isRegistered ? (
        <RegisterPatientRoutes />
      ) : (
        <PublicRoutes />
      )}
    </>
  );
};

export default Router;
