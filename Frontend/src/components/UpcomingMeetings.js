import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Groups3Icon from "@mui/icons-material/Groups3";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import state from "../data";
import Header from "./Header";

const UpcomingMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios
      .request({
        method: "get",
        url: `http://localhost:9000/appointments/get-upcoming-appointment`,
        params: {
          email: state.email,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setMeetings(res.data.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <Box>
          <Header pageTitle="Upcoming Meetings" name={state.username} />
        </Box>
      </Grid>
      <Grid item>
        <Box className="alignCenter">
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              maxWidth: "40rem",
            }}
            className="alignCenter"
          >
            {meetings.map((meeting, idx) => {
              return (
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                    // border: "1px solid black",
                    bgcolor: "background.paper",
                    padding: "1rem",
                    pb: 3,
                  }}
                >
                  {/* <Box sx={{ my: 3, mx: 2, borderRadius: "3px" }}> */}
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                          fontWeight: "900",
                        }}
                      >
                        {meeting.title}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={
                        {
                          // border: '1px solid green'
                        }
                      }
                    >
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        sx={{
                          mr: 4,
                          mt: 8,
                          // fontSize: "3rem"
                          fontWeight: "900",
                        }}
                      >
                        {meeting.time}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="text.secondary" variant="body2">
                    {meeting.agenda}
                  </Typography>
                  {/* </Box> */}
                  <Divider
                    sx={{
                      my: 3,
                    }}
                    variant="middle"
                  >
                    <Chip label="Host --> Guest" />
                  </Divider>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Chip
                      sx={{
                        width: "45%",
                      }}
                      label={`${meeting.host.name} | ${meeting.host.email}`}
                    />
                    <div
                      className="alignCenter"
                      style={{
                        width: "10%",
                        display: "flex",
                        // border: "1px solid red"
                      }}
                    >
                      <ArrowRightAltIcon />
                    </div>
                    <Chip
                      sx={{
                        width: "45%",
                        // border: '1px solid red'
                      }}
                      label={`${meeting.guest.name} | ${meeting.guest.email}`}
                    />
                  </Box>
                </Paper>
              );
            })}
          </Stack>

          {/* start */}

          {/* end */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpcomingMeetings;
