//Import the mongoose module
// require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true })

const db = mongoose.connection

module.exports = db