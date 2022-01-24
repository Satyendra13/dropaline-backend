const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = require('../models/auth')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:"This is facluty get route"
    })
})

router.post('/signup', (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }else{
            const users = new Users({
                _id:new mongoose.Types.ObjectId,
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                usertype: req.body.usertype,
            })

            users.save()
            .then(result=>{
                res.status(200).json({
                    user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})


router.post('/login', (req, res, next)=>{
    Users.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(404).json({
                message:"User not found"
            })
        }else{
            console.log(req.body.password)
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(!result){
                    return res.status(404).json({
                        message:"Password not matched"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        username:user[0].username,
                        name:user[0].name,
                        email:user[0].name,
                        phone:user[0].phone,
                        usetype:user[0].usertype
                    },
                    'developed by satyendra', 
                    {
                        expiresIn:"24h"
                    } 
                    )
                    res.status(200).json({
                        username:user[0].username,
                        name:user[0].name,
                        email:user[0].name,
                        phone:user[0].phone,
                        usetype:user[0].usertype,
                        token:token
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router