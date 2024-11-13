const jwt = require("jsonwebtoken")

const users = require("../model/userModel")


//  register
exports.register= async(req,res)=>{
    // logic
    const{username,email,password}= req.body
    console.log(username,email,password);
    
    try {
        const existinguser = await users.findOne({email})
        if(existinguser){
           
            res.status(406).json('user aleready exist')
        }
        else{
            const newuser = new users({
                username,
                email,
                password,
                profile:"",
                github:"",
                linkedin:"",

            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}


// login 
exports.login=async(req,res)=>{
  const {email,password} = req.body
  console.log(email,password);

  try {
    const existinguser =await users.findOne({email,password})
    if(existinguser){
        const token = jwt.sign({userId:existinguser._id},"secretkey")
        res.status(200).json({existinguser,token})
    }
    else{
        res.status(406).json('Incorrect email id or password')
    }
  } catch (error) {
    res.status(401).json(error)

    
  }
  
}

// update profile

exports.editProfileController = async (req,res)=>{

    const userId = req.payload

    const{username,email,password,profile,github,linkedin} = req.body

    uploadimage = req.file?req.file.filename : profile 

    try {

        const existinguser = await users.findByIdAndUpdate({_id:userId},{
            username,
            email,
            password,
            profile:uploadimage,
            github,
            linkedin
        },{new:true})

        await existinguser.save()
        res.status(200).json(existinguser)
        
    } catch (error) {
        res.status(401).json(error)
    }
  

}