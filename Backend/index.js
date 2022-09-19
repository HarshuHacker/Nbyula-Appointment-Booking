const express = require('express')
const createError = require('http-errors')
const cors = require('cors')
const app = express()
const port = 9000

app.use(express.urlencoded({extended: true}))
const db = require('./Config/mongoose')

app.use(cors())
app.use('/', require('./Routes'))

app.use(async(req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

app.listen(port)