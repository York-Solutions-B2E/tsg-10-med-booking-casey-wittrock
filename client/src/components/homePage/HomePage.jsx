import React, { useState } from "react";
import { Button } from "@mui/material";
import { LocalHospitalRounded } from "@mui/icons-material";

import Doctor from "../../assets/Doctor.jpg";

import useAppContext from "../../hooks/useAppContext";

const HomePage = () => {
  const { handleLogin } = useAppContext();
  return (
    <div className="container flex-col justify-items-center ">
      <div className="bg-slate-50 w-[60rem] justify-items-center drop-shadow-sm pb-[25px] rounded-full pt-20 mt-20">
        <h1 className=" text-[7rem]">
          Med
          <LocalHospitalRounded />
          Booking
        </h1>
      </div>
      <div className="fixed right-[5%] z-[-1] top-[50%] backdrop-blur-md backdrop-brightness-75 px-3 py-1 rounded-lg">
        <p className="text-center text-white w-[25rem] text-2xl">
          Welcome to MedBooking! We are a platform that helps you book
          appointments with doctors and other healthcare professionals. Booking
          an appointment has never been easier. Just sign in or sign up and get
          started. You are in safe hands with us.
        </p>
      </div>
      <div className="mt-[5rem]">
        <Button
          variant="contained"
          size="large"
          className="rounded-lg"
          onClick={handleLogin}
        >
          Get Booking Now
        </Button>
      </div>

      <div
        className="fixed h-[100vh] w-[40vw] rounded-full opacity-40 top-[10%] left-0 z-[-5] bg-cover bg-center"
        style={{ backgroundImage: `url(${Doctor})` }}
      ></div>
    </div>
  );
};

export default HomePage;
