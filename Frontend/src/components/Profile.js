import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  setRef,
  Snackbar,
  TextField,
} from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditIcon from "@mui/icons-material/Edit";

import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";

import axios from "axios";

import state from "../data";

import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Profile = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const [editHrs, setEditHrs] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [editName, setEditName] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMissMatch, setShowAlertMissMatch] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    setUsername(state.username);
    setEmail(state.email);
    setStartTime(state.startTime);
    setEndTime(state.endTime);
  }, []);

  const pushToDB = () => {
    axios
      .request({
        method: "get",
        url: "https://nbyula-appointment-booking.vercel.app/users/one-user",
        params: {
          email,
        },
      })
      .then((res) => {
        if (
          (pass.length == 0 || pass == res.data.data.password) &&
          startTime == res.data.data.startTime &&
          endTime == res.data.data.endTime &&
          username == res.data.data.name
        ) {
          setAlertSeverity("warning");
          setAlertMessage("No Changes Were Made!");
          setShowAlert(true);
          return;
        } else {
          const updatedPassword =
            pass.length > 0 ? pass : res.data.data.password;
          axios
            .request({
              method: "post",
              url: `https://nbyula-appointment-booking.vercel.app/users/update-profile`,
              params: {
                email,
                password: updatedPassword,
                name: username,
                startTime: startTime,
                endTime: endTime,
              },
            })
            .then((res) => {
              state.email = res.data.user.email;
              state.username = res.data.user.name;
              state.startTime = res.data.user.startTime;
              state.endTime = res.data.user.endTime;

              setAlertSeverity("success");
              setAlertMessage(res.data.message);
              setShowAlert(true);
            })
            .catch((err) => {
              setUsername(state.username);
              setAlertSeverity("error");
              setAlertMessage(err.response.data.message);
              setShowAlert(true);
            });
        }
      });
  };

  return (
    <>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Box>
            <Header pageTitle="Profile" name={username} />
          </Box>
        </Grid>
        <Grid item>
          <Box className="alignCenter" sx={{ mt: 1 }}>
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                maxWidth: 460,
              }}
              className="alignCenter"
            >
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  // maxWidth: 360,
                  // border: "1px solid black",
                  bgcolor: "background.paper",
                  padding: "0.4rem",
                  paddingRight: "1.5rem",
                }}
              >
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setEditName(true);
                          setDialogTitle("Enter new Name");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={username} />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AlternateEmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={email} />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setEditPass(true);
                          setDialogTitle("Enter Your new Password");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <VisibilityIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Password"
                      secondary={"*-*-*-*-*-*"}
                    />
                  </ListItem>
                  {/* <Divider variant="inset" component="li" /> */}
                </List>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  // maxWidth: 360,
                  // border: "1px solid black",
                  bgcolor: "background.paper",
                  padding: "0.4rem",
                  paddingRight: "1.5rem",
                }}
              >
                <List>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setEditHrs(true);
                          setDialogTitle("Edit Working Hours");
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ScheduleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Working Timings"
                      secondary={`${startTime} - ${endTime}`}
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* <Collapse in={changes} timeout="auto" unmountOnExit>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: "30", mb: 2}}
                        >
                            Save Changes
                        </Button>
                    </Collapse> */}
            </Stack>
          </Box>
          <Dialog open={editHrs}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <Grid
              container
              spacing={3}
              sx={{
                width: "25rem",
                p: 4,
              }}
            >
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  id="startTime"
                  label="Enter Start Time"
                  name="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => {
                    let hrs = e.target.value.split(":")[0];
                    let min = e.target.value.split(":")[1];

                    let hrs2 = endTime.split(":")[0];
                    let min2 = endTime.split(":")[1];
                    if (hrs < hrs2) setStartTime(e.target.value);
                    else if (hrs == hrs2 && min < min2)
                      setStartTime(e.target.value);
                  }}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  id="endTime"
                  label="Enter End Time"
                  name="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => {
                    let hrs = e.target.value.split(":")[0];
                    let min = e.target.value.split(":")[1];

                    let hrs2 = startTime.split(":")[0];
                    let min2 = startTime.split(":")[1];
                    if (hrs > hrs2) setEndTime(e.target.value);
                    else if (hrs == hrs2 && min > min2)
                      setEndTime(e.target.value);
                  }}
                />
              </Grid>

              <Grid item md={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    setEditHrs(false);
                    pushToDB();
                  }}
                  // sx={{ mt: 3, mb: 2, mr: 10, ml: 10 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Dialog>

          {/* Name */}
          <Dialog open={editName}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <Grid
              container
              spacing={3}
              sx={{
                width: "25rem",
                p: 4,
              }}
            >
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Enter name"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Grid>

              <Grid item md={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    setEditName(false);
                    pushToDB();
                  }}
                  // sx={{ mt: 3, mb: 2, mr: 10, ml: 10 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Dialog>

          {/* Password */}
          <Dialog open={editPass}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <Grid
              container
              spacing={3}
              sx={{
                width: "25rem",
                p: 4,
              }}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  id="conf-password"
                  label="Confirm Password"
                  name="conf-password"
                  type="password"
                  value={cpass}
                  onChange={(e) => {
                    setCpass(e.target.value);
                  }}
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item md={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {
                    if (pass === cpass) {
                      setEditPass(false);
                      pushToDB();
                    } else {
                      setShowAlertMissMatch(true);
                    }
                  }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Dialog>

          <Snackbar
            open={showAlertMissMatch}
            autoHideDuration={2500}
            onClose={() => setShowAlertMissMatch(false)}
          >
            <Alert variant="filled" severity={"error"}>
              {"Password Miss Match"}
            </Alert>
          </Snackbar>

          <Snackbar
            open={showAlert}
            autoHideDuration={2500}
            onClose={() => setShowAlert(false)}
          >
            <Alert variant="filled" severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
