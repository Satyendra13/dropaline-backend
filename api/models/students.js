const mongoose = require('mongoose')

const students = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    gender:String,
    address:String,
    city:String,
    district:String,
    state:String,
    country:String,
    imageFile:String,
})

module.exports = mongoose.model("Students", students);