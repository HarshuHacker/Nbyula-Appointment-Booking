const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000

app.use(express.urlencoded({extended: true}))
const db = require('./config/mongoose')

app.use(cors())
app.use('/', require('./routes'))

app.listen(port)