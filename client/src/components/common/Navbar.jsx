import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Link, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LocalHospitalRounded } from "@mui/icons-material";

const Navbar = ({
  isLoggedIn,
  loading,
  login,
  logout,
  isRegistered,
  isAdmin,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar component="nav" position="static">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar variant="dense" className="flex">
            <Button
              onClick={() => navigate("/")}
              color="inherit"
              variant="outlined"
            >
              {isLoggedIn && !isAdmin
                ? "Patient Home"
                : isAdmin
                ? "Admin Home"
                : "Welcome"}
            </Button>
            {isLoggedIn && !isAdmin ? (
              <>
                {isRegistered && (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      className="rounded-lg m-3"
                      startIcon={<LocalHospitalRounded />}
                      onClick={() => {
                        navigate("/appointments/create");
                      }}
                    >
                      Make an Appointment
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  className="justify-self-end"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : isLoggedIn && isAdmin ? (
              <>
                <Button
                  variant="contained"
                  className="justify-self-end"
                  onClick={logout}
                >
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
