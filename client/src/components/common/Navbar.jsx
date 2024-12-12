import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Link, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalHospitalRounded } from "@mui/icons-material";

const Navbar = ({ isLoggedIn, loading, login, logout, isRegistered }) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar component="nav" position="static">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar variant="dense">
            <Button onClick={() => navigate("/")} color="inherit">
              {isLoggedIn ? "Patient Home" : "Welcome"}
            </Button>
            {isLoggedIn ? (
              <>
                {isRegistered && (
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
                  </>
                )}
                <Button variant="contained" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={login}
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
