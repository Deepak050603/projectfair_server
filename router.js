// import express

const express = require('express')

// import projectcontroller

const projectcontroller =require('./controller/projectController')

// import userController

const userController = require('./controller/userController')

// import jwt middlwear

const jwtmiddlewear = require('./middlewear/jwtmiddlewear')

// import multer

const multerConfig = require('./middlewear/multermiddlewear')

// instance router

const router = new express.Router()

// Register

router.post('/register',userController.register)

// add project

router.post('/add-project',jwtmiddlewear,multerConfig.single("projectImage"),projectcontroller.addProjectController)

// login

router.post('/login',userController.login)


// all project

router.get('/all-project',jwtmiddlewear,projectcontroller.getAllProjectController)

// home project

router.get('/home-project',projectcontroller.getHomeProjectController)

// user project

router.get('/user-project',jwtmiddlewear,projectcontroller.getUserProjectController)

// remove user project

router.delete('/remove-userproject/:id',jwtmiddlewear,projectcontroller.removeUserProjectController)

// edit user project

router.put('/update-userproject/:id',jwtmiddlewear,multerConfig.single("projectImage"),projectcontroller.editProjectcontroller)

//  update user profile 

router.put('/update-userprofile',jwtmiddlewear,multerConfig.single("profile"),userController.editProfileController)

// exporting
module.exports =router