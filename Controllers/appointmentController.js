const Appointment = require('../Models/appointment')
const User = require('../Models/users')

const isAvailable = (startTime, endTime, time) => {
  var startTime = Number(startTime.replace(':', ''))
  var endTime = Number(endTime.replace(':', ''))
  var time = Number(time.replace(':', ''))
  console.log(startTime, endTime, time)
  if(startTime <= time && endTime >= time) {
    return true
  } else {
    return false
  }
}

module.exports.createAppointment = async function(req, res) {
  try {
    let host = await User.findOne({email: req.body.host})
    let guest = await User.findOne({email: req.body.guest})

    if(!isAvailable(host.startTime, host.endTime, req.body.time)) {
      return res.json(404, {
        message: `You Are Not Available For ${req.body.time}`
      })
    }

    if(!isAvailable(guest.startTime, guest.endTime, req.body.time)) {
      return res.json(404, {
        message: `${guest.name} Is Not Available At ${req.body.time}`
      })
    }

    for (let i of host.appointment) {
      appoint = await Appointment.findById(i)
      if(appoint.time === req.body.time) {
        return res.json(404, {
          message: `You Have Another Meeting At ${req.body.time}`
        })
      }
    }

    for (let i of guest.appointment) {
      appoint = await Appointment.findById(i)
      if(appoint.time === req.body.time) {
        return res.json(404, {
          message: `${guest.name} Has Another Meeting At ${req.body.time}`
        })
      }
    }

    let appointment = await Appointment.create({
      title: req.body.title,
      agenda: req.body.agenda,
      time: req.body.time, 
      host: host.id,
      guest: guest.id
    })

    host.appointment.push(appointment)
    host.save()
    guest.appointment.push(appointment)
    guest.save()
    
    return res.json(200, {
      data: {
        guest: guest,
        host: host
      },
      message: "Appointment Created Successfully"
    })
  } catch (err) {
    return res.json(500, {
      message: "Error In Creating Appointment"
    })
  }
}

module.exports.getUserAppointment = async function(req, res){
  try {
    let user = await User.findOne({email: req.body.email})
    usersArray = []
    for (let i of user.appointment) {
      appoint = await Appointment.findById(i).populate('host', 'name email').populate('guest', 'name email')
      usersArray.push(appoint)
    }
    return res.json(200, {
      message: `List Of Appointments Of ${user.name}`,
      data: usersArray
    })
  } catch (error) {
    console.log(error)
    return res.json(500, {
      message: "Error In Finding Appointment"
    })
  }
}