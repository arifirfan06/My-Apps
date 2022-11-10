require('dotenv').config()
const express = require('express')
const router = express.Router()
const { getUser, updateUser, deleteUser } = require('../controller/user')

router.route('/user')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router