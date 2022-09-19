import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";
import state from "../data";

const Header = ({ pageTitle, name }) => {
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
