const Appointment = require("../Models/appointment");
const User = require("../Models/users");

// Function To Check If The Appointment Time Is Between The User's Start Time And End Time
const isAvailable = (startTime, endTime, time) => {
  var startTime = Number(startTime.replace(":", ""));
  var endTime = Number(endTime.replace(":", ""));
  var time = Number(time.replace(":", ""));
  if (startTime <= time && endTime >= time) {
    return true;
  } else {
    return false;
  }
};

// To Get The Indian Standard Time
const getIST = () => {
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTTime = new Date(currentTime.getTime() + (330 + currentOffset) * 60000);
  var hoursIST = String(ISTTime.getHours());
  var minutesIST = String(ISTTime.getMinutes());
  return [hoursIST, minutesIST];
};

// To Create An Appointment
module.exports.createAppointment = async function (req, res) {
  try {
    // Fetching The Host And Guest From Database Using Their Email Id's
    let host = await User.findOne({ email: req.query.host });
    let guest = await User.findOne({ email: req.query.guest });

    // Checking If The Appointment Time Is An Upcoming Time Or Not
    time = Number(req.query.time.replace(":", ""));
    currTime = getIST();
    hrs = currTime[0];
    min = currTime[1];
    currTime = Number(hrs + min);
    if (time <= currTime) {
      return res.json(500, {
        message: `You Can't Schedule Appointment Before Or At ${hrs}:${min}`,
      });
    }

    // Checking If The Host Is Available At The Given Time
    if (!isAvailable(host.startTime, host.endTime, req.query.time)) {
      return res.json(404, {
        message: `You Are Not Available For ${req.query.time}`,
      });
    }

    // Checking If The Guest Is Available At The Given Time
    if (!isAvailable(guest.startTime, guest.endTime, req.query.time)) {
      return res.json(404, {
        message: `${guest.name} Is Not Available At ${req.query.time}`,
      });
    }

    // Checking If The Host Has Another Appointment At The Given Time
    for (let i of host.appointment) {
      appoint = await Appointment.findById(i);
      if (appoint.time === req.query.time) {
        return res.json(404, {
          message: `You Have Another Meeting At ${req.query.time}`,
        });
      }
    }

    // Checking If The Guest Has Another Appointment At The Given Time
    for (let i of guest.appointment) {
      appoint = await Appointment.findById(i);
      if (appoint.time === req.query.time) {
        return res.json(404, {
          message: `${guest.name} Has Another Meeting At ${req.query.time}`,
        });
      }
    }

    // If All The Checks Are Passed Then We Create The Appointment
    let appointment = await Appointment.create({
      title: req.query.title,
      agenda: req.query.agenda,
      time: req.query.time,
      host: host.id,
      guest: guest.id,
    });

    // Pushing The Appointment Into The appointment Array Of Host And The Guest
    host.appointment.push(appointment);
    host.save();
    guest.appointment.push(appointment);
    guest.save();

    return res.json(200, {
      data: {
        guest: guest,
        host: host,
      },
      message: "Appointment Created Successfully",
    });
  } catch (err) {
    return res.json(500, {
      message: "Error In Creating Appointment",
    });
  }
};

// Fetching All The Appointments Of A User
module.exports.getUserAppointment = async function (req, res) {
  try {
    // Finding The User In The Database
    let user = await User.findOne({ email: req.query.email });
    usersArray = [];
    // Appending All The Appointments Of The User In The Array(usersArray)
    for (let i of user.appointment) {
      appoint = await Appointment.findById(i)
        .populate("host", "name email")
        .populate("guest", "name email");
      usersArray.push(appoint);
    }
    return res.json(200, {
      message: `List Of Appointments Of ${user.name}`,
      data: usersArray,
    });
  } catch (error) {
    return res.json(500, {
      message: "Error In Finding Appointment",
    });
  }
};

// Fetching All The Upcoming Appointments Of A User
module.exports.getUpcomingAppointments = async function (req, res) {
  try {
    // Finding The User In The Database
    let user = await User.findOne({ email: req.query.email });
    usersArray = [];
    // Appending All The Appointments Of The User In The Array(usersArray) Which Is After The Current Time
    for (let i of user.appointment) {
      appoint = await Appointment.findById(i)
        .populate("host", "name email")
        .populate("guest", "name email");
      time = Number(appoint.time.replace(":", ""));
      currTime = getIST();
      hrs = currTime[0];
      min = currTime[1];
      currTime = Number(hrs + min);
      if (time >= currTime) {
        usersArray.push(appoint);
      }
    }
    return res.json(200, {
      message: `List Of Upcoming Appointments Of ${user.name}`,
      data: usersArray,
    });
  } catch (err) {
    return res.json(500, {
      message: "Unable To Find Upcoming Appointments",
    });
  }
};
