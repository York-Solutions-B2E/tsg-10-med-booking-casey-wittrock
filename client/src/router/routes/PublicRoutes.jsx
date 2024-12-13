import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../components/homePage/HomePage";
import NotFound from "../../components/common/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<div>Register</div>} />
      <Route path="/login" element={<div>Login</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
