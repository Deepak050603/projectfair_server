// import express

const express = require('express')

// import env

require('dotenv').config()

// import cors

const cors = require('cors')

// import connect
 require('./conection')

// import router

const router = require('./router')

// create server

const pfserver = express()

// server using cors

pfserver.use(cors())

// parse the data-middlewear -parse the data

pfserver.use(express.json())

// use router

pfserver.use(router)

// exporting upload folder

pfserver.use('/upload',express.static('./uploads'))

// port
const PORT = 4000 || process.env.PORT

// listen

pfserver.listen(PORT,()=>{
    console.log(`server running succesfully at port no ${PORT}`);
    
})



// get 

// pfserver.get('/',(req,res)=>{
//     res.send('get rquest recieved')
// })

// pfserver.post('/',(req,res)=>{
//     res.send('post request recieved')
// })

// pfserver.put('/',(req,res)=>{
//     res.send('put request recieved')
// })

// pfserver.delete('/',(req,res)=>{
//     res.send('delete request recieved')
// })