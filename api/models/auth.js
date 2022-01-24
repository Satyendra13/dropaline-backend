const mongoose = require('mongoose')

const users = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    name:String,
    email:String,
    phone:Number,
    password:String,
    usertype:String
})

module.exports = mongoose.model("Users", users);