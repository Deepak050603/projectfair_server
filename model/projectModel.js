// import mongoose

const mogoose =require('mongoose')

const projectSchema = new mogoose.Schema({
    title:{
        required : true,
        type:String
    },
    language:{
        required : true,
        type:String
    },
    github:{
        required : true,
        type:String
    },
    website:{
        required : true,
        type:String
    },
    overview:{
        required : true,
        type:String
    },
    projectImage:{
        required : true,
        type:String
    },
    userId:{
        required : true,
        type:String
    }
    
})

// /model

const projects = mogoose.model('projects',projectSchema)


module.exports = projects


