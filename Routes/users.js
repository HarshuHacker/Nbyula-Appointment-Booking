const express = require('express')
const router = express.Router()

const usersController = require('../Controllers/userController')

router.post('/register', usersController.register)
router.post("/login", usersController.login)
router.get('/all-user', usersController.allUser)

module.exports = router