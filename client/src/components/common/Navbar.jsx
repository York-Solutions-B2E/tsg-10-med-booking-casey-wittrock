import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Link, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalHospitalRounded } from "@mui/icons-material";
import useAppContext from "../../hooks/useAppContext";

const Navbar = ({ isLoggedIn }) => {
  const { loading, handleLogin, handleLogout } = useAppContext();
  const navigate = useNavigate();
  return (
    <>
      <AppBar component="nav" position="static">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar variant="dense">
            <h1>Navbar</h1>
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  className="rounded-lg"
                  startIcon={<LocalHospitalRounded />}
                  onClick={() => {
                    navigate("/appointments/create");
                  }}
                >
                  Make an Appointment
                </Button>
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </LoadingButton>
              </>
            )}
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
