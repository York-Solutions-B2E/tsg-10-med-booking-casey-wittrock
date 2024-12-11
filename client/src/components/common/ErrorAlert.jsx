import React from "react";

const ErrorAlert = ({ error }) => {
  if (!error) return null;
  return (
    <div className="alert alert-danger" role="alert">
      Error
    </div>
  );
};

export default ErrorAlert;
