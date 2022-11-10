require('dotenv').config()
const mongoose = require('mongoose')
const db = require('./config')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : false
    }
})

const userWakanda = new mongoose.model('userWakanda', userSchema)

module.exports = userWakanda
