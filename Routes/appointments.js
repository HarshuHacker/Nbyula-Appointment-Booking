const express = require('express')
const router = express.Router()

const appointmentController = require('../Controllers/appointmentController')

router.get('/create-appointment', appointmentController.createAppointment)
router.get('/get-user-appointment', appointmentController.getUserAppointment)

module.exports = router