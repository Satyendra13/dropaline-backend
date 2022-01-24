const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const students = require("./api/routes/students")
const auth = require('./api/routes/auth')
const fileUpload = require('express-fileupload')


mongoose.connect('mongodb+srv://admin-satyendra:admin@project1db.rdsoy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error', err=>{
    console.log("Connection Failed")
})


app.use(fileUpload({
    useTempFiles:true
}))

mongoose.connection.on('connected', connected=>{
    console.log("Database connected")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use("/student", students)
app.use('/auth', auth)

app.use((req, res, next) =>{
    res.status(404).json({
        error:"bad request"
    })
})

module.exports = app