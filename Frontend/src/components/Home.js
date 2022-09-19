import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

import UpcomingIcon from "@mui/icons-material/Upcoming";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AndroidIcon from "@mui/icons-material/Android";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import state from "../data";

const Home = ({ children, pageTitle }) => {
  let navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
      spacing={0}
    >
      <Grid
        item
        md={2}
        sx={{
          // border: "1px solid red",
          borderRight: "1px solid grey",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#3D3C42",
          color: "#FEFBF6",
          flexDirection: "column",
          pt: 1,
        }}
      >
        <div
          style={{
            borderBottom: "1px dashed grey",
            width: "100%",
            paddingTop: "0.5rem",
            paddingBottom: "0.85rem",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              pl: 2,
            }}
          >
            <strong>Scheduler</strong>
          </Typography>
        </div>

        <List
          sx={{
            // border: "1px solid black",

            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {[
            {
              text: "Profile",
              icon: <AccountCircleIcon color="primary" />,
              path: "/profile",
            },
            {
              text: "Upcoming",
              icon: <UpcomingIcon color="primary" />,
              path: "/upcoming",
            },
            {
              text: "Schedule",
              icon: <ScheduleIcon color="primary" />,
              path: "/schedule",
            },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid
        item
        md={10}
        sx={{
          backgroundColor: "#D8D8D8",
        }}
      >
        {children}
        {/* <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Box>
                            
                        </Box>
                    </Grid>
                    <Grid item>{children}</Grid>
                </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Home;
