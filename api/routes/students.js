const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Students = require("../models/students");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dy2refire",
  api_key: "477331642561949",
  api_secret: "l__glC5Ix18hf4hvKQjzSLwPLCw",
  secure: true,
});

// get all students
router.get("/getAllStudents", (req, res, next) => {
  Students.find()
    .then((result) => {
      res.status(200).json({
        students: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// get student by id
router.get("/getStudentById/:id", (req, res, next) => {
  Students.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        students: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//delete

router.delete("/deleteStudent/:id", (req, res, next) => {
  Students.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "students deleted successfully",
        // student:result
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// update student

router.put("/updateStudent/:id", (req, res, next) => {
  Students.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        student: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//create student

router.post("/createStudent", (req, res, next) => {
  const imageFile = req.files.imageFile;
  // console.log(imageFile)
  cloudinary.uploader.upload(imageFile.tempFilePath, (err, result) => {
    console.log(result);
    // console.log(err)
    const student = new Students({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      address: req.body.address,
      city: req.body.city,
      district: req.body.district,
      state: req.body.state,
      country: req.body.country,
      imageFile: result.url,
    });
    student.save()
    .then(result =>{
        res.status(200).json({
            students:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            error:error
        })
    })
  });

});

module.exports = router;
