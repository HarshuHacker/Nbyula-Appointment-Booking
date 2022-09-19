import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Divider, Snackbar } from "@mui/material";

import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import state from "../data";

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

export default function Login() {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("error");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const pass = formData.get("password");

    axios
      .request({
        method: "post",
        url: `https://nbyula-appointment-booking.vercel.app/users/login`,
        params: {
          email: email,
          password: pass,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAlertMessage(res.data.message);
        setAlertSeverity("success");
        setShowAlert(true);

        setTimeout(() => {
          state.loggedIn = true;
          state.email = res.data.user.email;
          state.username = res.data.user.name;
          state.startTime = res.data.user.startTime;
          state.endTime = res.data.user.endTime;

          console.log(state);
          navigate("/profile");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        setAlertMessage(err.response.data.message);
        setAlertSeverity("error");
        setShowAlert(true);
      });
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container direction={"column"} className="alignCenter">
                <Grid item>
                  {"Don't have an account? | "}
                  <Link to={"/register"}>{"Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
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
