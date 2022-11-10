const { hashSync, compareSync } = require('bcrypt')
// const passport = require('passport')
const userWakanda = require('../model/user')
// const jwt = require('jsonwebtoken')

class UserController {
    async getUser(req, res) {
        try {
            const user = await userWakanda.findOne({ username: req.body.username })
            res.status(200).json({
                success: true,
                message: 'Successfully Get Data',
                data: user
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: 'Get Data Failed'
            })
        }
    }

    async updateUser(req, res) {
        const { id, username, email, password } = req.body
        console.log(req.body)
        try {
            await userWakanda.update({ _id: id }, { $set: { username, email, password: hashSync(password, 10) } })
            res.status(200).json({
                success: true,
                message: 'Successfully Update Data'
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: 'Update Data Failed'
            })
        }
    }

    async deleteUser(req, res) {
        const { id } = req.body
        try {
            await userWakanda.deleteOne({ _id: id })
            res.status(200).json({
                success: true,
                message: 'Successfully Delete Data'
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: 'Delete Data Failed'
            })
        }
    }
}

module.exports = new UserController()