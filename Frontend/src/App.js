import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Schedule from "./components/Schedule";
import UpcomingMeetings from "./components/UpcomingMeetings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* login / register */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* profile page */}
        <Route
          path="/profile"
          element={
            <>
              <Home pageTitle="Profile">
                <Profile />
              </Home>
            </>
          }
        />

        {/* upcoming meetings */}
        <Route
          path="/upcoming"
          element={
            <>
              <Home pageTitle="Upcoming Meetings">
                <UpcomingMeetings />
              </Home>
            </>
          }
        />

        {/* schedule meetings */}
        <Route
          path="/schedule"
          element={
            <>
              <Home pageTitle="Schedule a Meeting">
                <Schedule />
              </Home>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
