const express = require('express')
const router = express.Router()

const usersController = require('../Controllers/userController')

router.post('/register', usersController.register)

module.exports = router