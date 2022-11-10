require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./src/routes')
const cors = require('cors')
const passport = require('passport')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
require('./src/middleware/passport')

app.use(router)
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di ${process.env.PORT}`)
})
