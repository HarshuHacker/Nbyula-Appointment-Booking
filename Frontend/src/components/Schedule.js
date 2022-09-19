import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";
import {
  Alert,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
} from "@mui/material";
import state from "../data";
import Header from "./Header";
import axios from "axios";

export default function Schedule() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [guests, setGuests] = useState([]);

  const [title, setTitle] = useState("");
  const [agenda, setAgenda] = useState("");
  const [time, setTime] = useState("");
  const [activeGuest, setActiveGuest] = useState("");

  useEffect(() => {
    // getting user list
    const temp = [];
    axios
      .request({
        method: "get",
        url: `http://localhost:9000/users/all-user`,
      })
      .then((res) => {
        console.log(res.data.data);
        const d = res.data.data;

        d.forEach((data) => {
          if (data.email === state.email) {
          } else temp.push(data.name + " - " + data.email);
        });
      })
      .catch((err) => {
        console.log(err.response);
        setAlertMessage(err.response.data.message);
        setAlertSeverity("error");
        setShowAlert(true);
      });
    setGuests(temp);
    setTime(
      new Date().toTimeString().split(" ")[0].split(":")[0] +
        ":" +
        new Date().toTimeString().split(" ")[0].split(":")[1]
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = state.email;
    const username = state.username;
    const title = data.get("title");
    const agenda = data.get("agenda");
    const time = data.get("time");

    console.log(email, activeGuest.split(" - ")[1], title, agenda);

    if (email && username && time && activeGuest) {
      axios
        .request({
          method: "post",
          url: `http://localhost:9000/appointments/create-appointment`,
          params: {
            host: email,
            guest: activeGuest.split(" - ")[1],
            title,
            agenda,
            time,
          },
        })
        .then((res) => {
          console.log(res.data);
          setAlertMessage("Successfully Scheduled a meeting");
          setAlertSeverity("success");
          setShowAlert(true);
        })
        .catch((err) => {
          console.log(err.response);
          setAlertMessage(err.response.data.message);
          setAlertSeverity("error");
          setShowAlert(true);
        });
    } else {
      setAlertMessage("Make sure to enter all the required details.");
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <Box>
          <Header pageTitle="Schedule" name={state.username} />
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            // border: "1px solid black",
            mt: 1,
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            height: "max-content",
            // backgroundColor: "#023C40",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: "5px",
              backgroundColor: "#f4f4f4",
            }}
          >
            <Container component="main" maxWidth="sm">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Typography component="h1" variant="h4">
                  Schedule an Appointment
                </Typography>

                <Grid
                  container
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                  spacing={5}
                >
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="agenda"
                      label="Agenda"
                      name="agenda"
                      value={agenda}
                      onChange={(e) => {
                        setAgenda(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="time"
                      label="Time"
                      name="time"
                      type={"time"}
                      value={time}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setTime(e.target.value);
                      }}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <InputLabel id="guest-label">Guest</InputLabel>
                    <Select
                      fullWidth
                      labelId="guest-label"
                      id="guest"
                      value={activeGuest}
                      // label="guest"
                      onChange={(e) => {
                        setActiveGuest(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {guests.map((guest, idx) => {
                        return (
                          <MenuItem value={guest} key={idx}>
                            {guest}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 10, ml: 10 }}
                  >
                    Schedule
                  </Button>
                </Grid>
              </Box>
            </Container>
          </Paper>
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
      </Grid>
    </Grid>
  );
}
