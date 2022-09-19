const User = require("../Models/users")

module.exports.register = async function(req, res){
  try {
    
    // Checking For The Email Id InThe Database
    let user = await User.findOne({email: req.body.email})

    // If The Email Id Does't Exist In The Database
    if(!user) {
      try {
        // Creating New User
        await User.create(req.body) 
        return res.json(200, {
          message: "Created An Account Successfully"
        })
      } catch (err) {
        return res.json(200, {
          message: err
        })
      }
    } else {
      // A User Already Exist With This Email Id
      return res.json(200, {
        message: "User Already Exists !!"
      })
    }
  } catch (err) {
    return res.json(500, {
      message: "Error In Finding User In Signing Up"
    })
  }
}

module.exports.login = async function(req,res) {
  try {
    // Finding User Using The Email Id
    let user = await User.findOne({
      email: req.body.email
    })

    // If Passwords Does't Match
    if(!user || user.password != req.body.password){
      return res.json(422, {
        message: "Invalid Usertname Or Password"
      })
    }
  
    // If The User Details Are Correct
    return res.json(200, {
      message: "Sign In Successfully",
      data: {
        name: user.name,
        email: user.email
      }
    })
  }
  catch(err)
  {
    console.log("Error : ",err)
    return res.json(500, {
      message: "Internal Server Error"
    })
  }
}

module.exports.updateProfile = async function(req, res) {
  try {
    await User.findOneAndUpdate({email: req.body.email}, {
      name: req.body.name, 
      password: req.body.password, 
      startTime: req.body.startTime, 
      endTime: req.body.endTime
    })
    return res.json(500, {
      message: "Profile Updated Successfully"
    })
  } catch (error) {
    return res.json(500, {
      message: "Error In Updating User Details"
    })
  }
}

module.exports.allUser = async function(req, res) {
  try {
    // Finding All Users
    let alluser = await User.find({})

    // Sending Only The Name And Email Of The Users
    return res.json(200, {
      data: 
        alluser.map((user) => {
          return {
            name: user.name,
            email: user.email
          }
        }),
      message: "User List"
    })
  } catch (err) {
    console.log("Error : ",err)
    return res.json(500, {
      message: "Error In Fetching User List"
    })
  }
}

module.exports.oneUser = async function(req, res) {
  try {
    // Finding The User With The Email
    let user = await User.findOne({email: req.body.email})

    // Sending Only The Name And Email Of The User
    return res.json(200, {
      data: {
        email: user.email,
        name: user.name
      },
      message: "User List"
    })
  } catch (err) {
    console.log("Error : ",err)
    return res.json(500, {
      message: "Error In Fetching The User"
    })
  }
}