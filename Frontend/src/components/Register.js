import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © | "}
      <Link color="inherit" to={"/"}>
        Nbyula.com
      </Link>

      {` | ${new Date().getFullYear()}`}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [startTime, setStartTime] = useState("01:00");
  const [endTime, setEndTime] = useState("23:59");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");
    const confPass = data.get("conf-password");
    const username = data.get("username");

    if (email && password && username && confPass) {
      if (confPass === password) {
        axios
          .request({
            method: "post",
            url: `https://nbyula-appointment-booking.vercel.app/users/register`,
            params: {
              email,
              password,
              name: username,
              startTime: startTime,
              endTime: endTime,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            setAlertMessage(res.data.message);
            setAlertSeverity("success");
            setShowAlert(true);
            navigate("/login");
          })
          .catch((err) => {
            console.log(err.response);
            setAlertMessage(err.response.data.message);
            setAlertSeverity("error");
            setShowAlert(true);
          });
      } else {
        setAlertMessage("Password Miss Match");
        setAlertSeverity("warning");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Make sure to enter all the required details.");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#023C40",
        }}
      >
        <Container
          sx={{
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          component="main"
          maxWidth="sm"
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Register
            </Typography>

            <Grid
              container
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Full Name"
                  name="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="conf-password"
                  label="Confirm Password"
                  name="conf-password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="startTime"
                  label="Working Start Time"
                  name="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="endTime"
                  label="Working End Time"
                  name="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mr: 10, ml: 10 }}
              >
                Register
              </Button>
              <Grid container className="alignCenter">
                <Grid item>
                  {"Already have an account? | "}
                  <Link to={"/login"}>{"Sign In"}</Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        <Snackbar
          open={showAlert}
          autoHideDuration={2500}
          onClose={() => setShowAlert(false)}
        >
          <Alert variant="filled" severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
