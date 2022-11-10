const express = require('express')
const { home } = require('../controller/auth')
const router = express.Router()
const auth = require('./auth')
const user = require('./user')
const passport = require('passport')

router.use('/user', auth)
router.use('/api', user)
router.get('/', passport.authenticate('jwt', { session: false }), home)

module.exports = router
