import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";

import LogoutIcon from "@mui/icons-material/Logout";

import Tooltip from "@mui/material/Tooltip";

import { useNavigate } from "react-router-dom";

import state from "../data";

const Header = ({ pageTitle, name }) => {
  const navigate = useNavigate();

  const resetState = () => {
    const temp = {
      loggedIn: false,
      username: "",
      email: "",
      startTime: "",
      endTime: "",
      appointment: [],
    };

    state = temp;
  };

  return (
    <AppBar
      position="static"
      sx={
        {
          // backgroundColor: '#3D3C42'
        }
      }
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <AndroidIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          // sx={{ flexGrow:  }}
        >
          {`${state.loggedIn ? "Welcome back, " + name : "Please Login"}`}
        </Typography>
        <Tooltip title="Sign Out">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              navigate("/login");
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
