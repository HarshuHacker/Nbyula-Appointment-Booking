const User = require("../Models/users");

module.exports.register = async function (req, res) {
  try {
    // Checking For The Email Id InThe Database
    let user = await User.findOne({ email: req.query.email });

    // If The Email Id Does't Exist In The Database
    if (!user) {
      try {
        // Creating New User
        await User.create(req.query);
        return res.json(200, {
          message: "Created An Account Successfully",
        });
      } catch (err) {
        return res.json(200, {
          message: err,
        });
      }
    } else {
      // A User Already Exist With This Email Id
      return res.json(418, {
        message: "User Already Exists !!",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Error In Finding User In Signing Up",
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    // Finding User Using The Email Id
    let user = await User.findOne({
      email: req.query.email,
    });
    // If Passwords Does't Match
    if (!user || user.password != req.query.password) {
      return res.json(422, {
        email: req.query.email,
        message: "Invalid Username Or Password",
      });
    }

    // If The User Details Are Correct
    return res.json(200, {
      message: "Sign In Successfully",
      user,
    });
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.updateProfile = async function (req, res) {
  try {

    // Checking If The Name Or The Password Of The User Is Blank Or Not
    if (req.query.name === "") {
      return res.json(500, {
        message: "Name Can't Be Empty",
      });
    }

    // Fetching User And Updating Data Of The User
    let user = await User.findOneAndUpdate(
      { email: req.query.email },
      {
        name: req.query.name,
        password: req.query.password,
        startTime: req.query.startTime,
        endTime: req.query.endTime,
      },
      { new: true }
    );

    return res.json(200, {
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    return res.json(500, {
      message: "Error In Updating User Details",
    });
  }
};

// Fetching All The Users
module.exports.allUser = async function (req, res) {
  try {
    // Finding All Users
    let alluser = await User.find({});

    // Sending Only The Name And Email Of The Users
    return res.json(200, {
      data: alluser.map((user) => {
        return {
          name: user.name,
          email: user.email,
        };
      }),
      message: "User List",
    });
  } catch (err) {
    return res.json(500, {
      message: "Error In Fetching User List",
    });
  }
};

// Fetching A Particular User
module.exports.oneUser = async function (req, res) {
  try {
    // Finding The User With The Email
    let user = await User.findOne({ email: req.query.email });

    // Sending Only The Name And Email Of The User
    return res.json(200, {
      data: user,
      message: "User List",
    });
  } catch (err) {
    return res.json(500, {
      message: "Error In Fetching The User",
    });
  }
};
