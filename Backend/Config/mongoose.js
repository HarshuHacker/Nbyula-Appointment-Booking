const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:admin@cluster0.xatnehf.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error In Connecting To Database'))
db.once('open', function() {
  console.log('Connected To MongoDB')
})
module.exports = db