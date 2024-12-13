import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import RegisterPatientRoutes from "./routes/RegisterPatientRoutes";
import AdminRouter from "./AdminRouter";
import AdminPage from "../components/adminComponents/adminHome/AdminPage";

const Router = ({ isLoggedIn, isAdmin, isRegistered }) => {
  return (
    <>
      {isLoggedIn && isAdmin ? (
        <AdminPage />
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
