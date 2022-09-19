const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  agenda: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment