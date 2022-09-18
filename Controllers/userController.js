const User = require("../Models/users")

module.exports.register = async function(req, res){
  try {
    
    let user = await User.findOne({email: req.body.email})

    // Check If User Already Has An Account Or Not
    if(!user) {
      try {
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
      return res.json(200, {
        message: "User Already Exists !!"
      })
    }
  } catch (err) {
    return res.json(200, {
      message: "Error In Finding User In Signing Up"
    })
  }
}