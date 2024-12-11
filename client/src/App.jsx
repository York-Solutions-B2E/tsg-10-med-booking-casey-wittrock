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

const App = () => {
  // Global state
  const [alert, setAlert] = useState([]);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);

  const nav = useNavigate();

  // Modal disclosures
  const submitApptModalDisc = useDisclosure();
  const registerModalDisc = useDisclosure();

  // Authentication functions

  /**
   * Global Function to handle authentication. This function will call the authenticate() method from MedBookingApi
   * with the XSRF-TOKEN in the cookies and set the user, profile, and appointments state if authentication is successful.
   * This function should be called in the App component's useEffect.
   * @returns {Promise<void>}
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

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setUserRole(null);
    setAppointments([]);
    removeCookie("XSRF-TOKEN");
  };

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
      // MedBookingApi.setToken(cookies["XSRF-TOKEN"]);
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
        handleLogout,
        handleCreateProfile,
        handleGetDoctorsAndSpecializations,
        handleSubmitAppointment,
        submitApptModalDisc,
        registerModalDisc,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Error message={error} /> */}
        <Alerts alert={alert} dismiss={handleAlertRemoval} />
        <Navbar
          isLoggedIn={user != null}
          isAdmin={userRole === "ADMIN"}
          isRegistered={profile != null}
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
