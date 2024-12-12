import { useState, useEffect } from "react";
import useDisclosure from "./hooks/useDisclosure";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AppContext from "./context/Appcontext";
import MedBookingApi from "./MedBookingApi";

import Router from "./router/Router";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Alerts from "./components/common/Alerts";

import { isInFuture } from "./helpers/isInFuture";
import { calcDateDif } from "./helpers/calcDateDif";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AccordionActions } from "@mui/material";

const App = () => {
  // Global state
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);

  // Navigation
  const nav = useNavigate();

  // Modal disclosures
  const submitApptModalDisc = useDisclosure();
  const registerModalDisc = useDisclosure();

  // -----------------Authentication functions

  /**
   * Global Function to handle authentication. This function will call the authenticate() method from MedBookingApi
   * with the XSRF-TOKEN in the cookies and set the user, profile, and appointments state if authentication is successful.
   * This function should be called in the App component's useEffect.
   */
  const handleAuth = async () => {
    setLoading(true);
    try {
      const { user, profile, appointments } =
        await MedBookingApi.authenticate();
      console.log(user);
      console.log(profile);
      console.log(appointments);
      setUser(user);
      setProfile(profile);
      setAppointments(appointments || []);
      setUserRole(user.role);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Global function to handle login. This will only redirect to the Okta login page
   * handled by the backend which will set the necessary cookies and redirect back to the client.
   */
  const handleLogin = () => {
    setLoading(true);
    let port = window.location.port ? ":" + window.location.port : "";
    if (port === ":3000") {
      port = ":8080";
    }
    window.location.href = `//${window.location.hostname}${port}/oauth2/authorization/okta`;
  };

  /**
   * Global function to handle logout. This will clear the user, profile, and appointments state
   * and remove the XSRF-TOKEN cookie.
   * This function should be called in the Navbar component.
   */
  const handleLogout = async () => {
    setUser(null);
    setProfile(null);
    setUserRole(null);
    setAppointments([]);
    const response = await MedBookingApi.logout();
  };

  // -----------------Patient Profile functions

  /**
   * Global function to handle creating a patient profile.
   *
   * This function will call the createProfile() method from MedBookingApi
   * and set the profile state if profile creation is successful.
   * @param {{
   *  gender: String,
   *  firstName: String,
   *  lastName: String,
   *  dob: String,
   *  }} data
   */
  const handleCreateProfile = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const newProfile = await MedBookingApi.createProfile(user.id, data);
      setLoading(false);
      setProfile(newProfile);
      nav("/");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------Appointment functions

  /**
   * Global function to handle submitting an appointment.
   *
   * This function will call the createAppointment() method from MedBookingApi
   * and set the new appointment in the appointments state.
   * @param {Number} slotId
   * @param {{reason: String, type: String}} data {reason: String, type: String}
   * @returns {Promise<void>}
   */
  const handleSubmitAppointment = async (slotId, data) => {
    setLoading(true);
    try {
      const appointment = await MedBookingApi.createAppointment(
        profile.id,
        slotId,
        data
      );
      setAppointments([...appointments, appointment]);
      submitApptModalDisc.close();
      setAlert({
        type: "success",
        message: "Appointment created successfully",
        severity: "success",
      });
      nav("/");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Global function to handle updating an appointment.
   *
   * This function will call the updateAppointment() method from MedBookingApi
   * and set the updated appointment in the appointments state.
   * @param {Number} apptId
   * @param {{reason: String, type: String}} apptInfo {reason: String, type: String}
   */
  const handleUpdateAppointment = async (apptId, apptInfo) => {
    setLoading(true);
    try {
      const updatedAppt = await MedBookingApi.updateAppointment(
        apptId,
        apptInfo
      );
      const updatedAppts = appointments.map((appt) =>
        appt.id === updatedAppt.id ? updatedAppt : appt
      );
      setAppointments(updatedAppts);
      setAlert({
        type: "success",
        message: "Appointment updated successfully",
        severity: "success",
      });
      nav(`/appointments/${apptId}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Global function to handle cancelling or confirming an appointment.
   *
   * This function will call the updateAppointmentStatus() method from MedBookingApi
   * and set the updated appointment in the appointments state.
   * @param {Number} apptId
   * @param {String} action
   */
  const handleCancelOrConfirmAppointment = async (apptId, status) => {
    setLoading(true);
    let updatedAppt;
    try {
      if (status === "CONFIRMED") {
        updatedAppt = await MedBookingApi.confirmAppointment(apptId);
      } else if (status === "CANCELED") {
        updatedAppt = await MedBookingApi.cancelAppointment(apptId);
      }
      const updatedAppts = appointments.map((appt) =>
        appt.id === updatedAppt.id ? updatedAppt : appt
      );
      setAppointments(updatedAppts);
      setAlert({
        type: "success",
        message: `Appointment ${action.toLowerCase()}ed successfully`,
        severity: "success",
      });
      nav(`/appointments/${apptId}`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------Doctor and Specialization data functions
  // These functions are used in the Appointment creation page and should work with that page's state.

  /**
   * Function to get the list of doctors and specializations.
   *
   * This function will call the getDoctors() and getSpecializations() methods from MedBookingApi
   * and return the data.
   *
   * This function should be used in the Appointment creation page.
   * @returns {Promise<{doctorsData: Array<DoctorObject>, specializationsData: Array<SpecializationObject>}>}
   */
  const handleGetDoctorsAndSpecializations = async () => {
    setLoading(true);
    try {
      const doctorsData = await MedBookingApi.getDoctors();
      const specializationsData = await MedBookingApi.getSpecializations();
      return { doctorsData, specializationsData };
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlertRemoval = () => {
    setAlert(null);
  };

  useEffect(() => {
    console.log("App useEffect");
    console.log(cookies["XSRF-TOKEN"]);
    console.log(user);
    console.log(profile);
    console.log(appointments);
    if (cookies["XSRF-TOKEN"] && user == null) {
      handleAuth();
      MedBookingApi.setToken(cookies["XSRF-TOKEN"]);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        appointments,
        profile,
        user,
        setAlert,
        handleLogin,
        handleCreateProfile,
        handleGetDoctorsAndSpecializations,
        handleSubmitAppointment,
        handleUpdateAppointment,
        handleCancelOrConfirmAppointment,
        submitApptModalDisc,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Error message={error} /> */}
        <Alerts alert={alert} dismiss={() => setAlert(null)} />
        <Navbar
          isLoggedIn={user != null}
          isAdmin={userRole === "ADMIN"}
          isRegistered={profile != null}
          loading={loading}
          login={handleLogin}
          logout={handleLogout}
        />
        <div className="container m-auto">
          <Router
            isLoggedIn={user != null}
            isAdmin={userRole == "ADMIN"}
            isRegistered={profile != null}
          />
          <Footer />
        </div>
      </LocalizationProvider>
    </AppContext.Provider>
  );
};

export default App;
