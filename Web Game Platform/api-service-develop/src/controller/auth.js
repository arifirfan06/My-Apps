const { hashSync, compareSync } = require('bcrypt')
const passport = require('passport')
const userWakanda = require('../model/user')
const jwt = require('jsonwebtoken')

class AuthController{
// register
    async register(req,res){
        try{
            await userWakanda.create({
                username : req.body.username,
                password : hashSync(req.body.password, 10),
                email : req.body.email
            })
            res.status(200).json({
                success : true,
                message : 'Register success'
            })
        }catch(err){
            res.status(400).json({
                success : false,
                message: 'Register failed'
            })
        }
    }

// check username
    async checkUsername(req,res){
        try{
            const check = await userWakanda.findOne({username : req.body.username})
            if(check){
                res.status(200).json({
                    success : false,
                    data : false,
                    message : 'Username already been used'
                })
            } else {
                res.status(200).json({
                    success : true,
                    data : true,
                    message : 'Username can be use'
                })
            }
        }catch(err){
            res.status(400).json({
                success : false,
                data : true,
                message : 'Error in checkusername'
            })
        }
    }

// login
    async login(req,res){
        try{
            const result = await userWakanda.findOne({username : req.body.username})
            if(result){
                if(!compareSync(req.body.password, result.password)){
                            res.status(400).json({
                                success : false,
                                message : 'Username or Password is wrong'
                            })
                    } else {
                            const payload = {
                                username : result.username,
                                id : result._id
                            }
                            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'})
                        
                            return res.status(200).json({
                                success : true,
                                message : 'Successfully to login',
                                data : {token : token}
                                })
                     }
            }
        }catch(error){
            res.status(400).json({
                success : false,
                message : 'Failed to login'
            })
        }
    }

// home autentikasi jwt
    async home(req,res){
        try {
            res.status(200).json({
                    success : true,
                    message : 'Successfully authenticate',
                    user : {
                        id : req.user._id,
                        username : req.user.username
                    }
                })
        } catch {
            res.status(400).json({
                success : false,
                message : 'failed authenticate'
            })
        }
        
    }
}

module.exports = new AuthController()