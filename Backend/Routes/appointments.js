const express = require('express')
const router = express.Router()

const appointmentController = require('../Controllers/appointmentController')

router.post('/create-appointment', appointmentController.createAppointment)
router.get('/get-user-appointment', appointmentController.getUserAppointment)
router.get('/get-upcoming-appointment', appointmentController.getUpcomingAppointments)

module.exports = router