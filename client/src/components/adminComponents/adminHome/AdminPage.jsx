import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AdminContext from "../../../context/AdminContext";
import AdminRouter from "../../../router/AdminRouter";
import AdminApi from "../../../adminApi";
import { useCookies } from "react-cookie";
import useAppContext from "../../../hooks/useAppContext";

const AdminPage = () => {
  const [cookies] = useCookies(["XSRF-TOKEN"]);
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const { loading, setLoading, handleGetDoctorsAndSpecializations } =
    useAppContext();
  const navigate = useNavigate();

  /**
   * Admin function to update a doctor's information.
   * @param {Number} doctorId
   * @param {{
   *  firstName: String,
   *  lastName: String,
   *  email: String,
   *  phone: String,
   *  specializationId: Number,
   *  }} data
   * @returns {Promise<DoctorObject>} {DoctorObject}
   */
  const handleUpdateDoctor = async (doctorId, data) => {
    try {
      const newDoctorData = await AdminApi.updateDoctor(doctorId, data);
      const newDoctors = doctors.map((doctor) => {
        if (doctor.id === doctorId) {
          return newDoctorData;
        }
        return doctor;
      });
      setDoctors(newDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Admin function to create a new doctor in the database.
   * @param {{
   * firstName: String,
   * lastName: String,
   * email: String,
   * phone: String,
   * specializationId: Number
   * }} data
   * @returns {Promise<DoctorObject>} {DoctorObject}
   */
  const handleCreateDoctor = async (data) => {
    try {
      const newDoctorData = await AdminApi.createDoctor(data);
      setDoctors([...doctors, newDoctorData]);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Admin function to delete a doctor from the database.
   * @param {Number} doctorId
   */
  const handleDeleteDoctor = async (doctorId) => {
    try {
      await AdminApi.deleteDoctor(doctorId);
      const newDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      setDoctors(newDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Admin function to get a doctor's information.
   * @param {Number} doctorId
   */
  const handleGetDoctor = async (doctorId) => {
    setLoading(true);
    try {
      return await AdminApi.getDoctor(doctorId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cookies["XSRF-TOKEN"]) {
      AdminApi.setToken(cookies["XSRF-TOKEN"]);
    }
    const getData = async () => {
      setLoading(true);
      try {
        const { doctorsData, specializationsData } =
          await handleGetDoctorsAndSpecializations();
        setDoctors(doctorsData);
        setSpecializations(specializationsData);
        console.log(doctorsData);
        console.log(specializationsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (doctors.length === 0 || specializations.length === 0) {
      getData();
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        doctors,
        specializations,
        loading,
        handleDeleteDoctor,
        handleCreateDoctor,
        handleUpdateDoctor,
      }}
    >
      <AdminRouter />
    </AdminContext.Provider>
  );
};

export default AdminPage;
