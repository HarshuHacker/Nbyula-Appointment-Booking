const express = require('express')
const router = express.Router()

const appointmentController = require('../Controllers/appointmentController')

router.get('/create-appointment', appointmentController.createAppointment)

module.exports = router