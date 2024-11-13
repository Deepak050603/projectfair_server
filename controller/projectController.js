const projects = require("../model/projectModel");



exports.addProjectController = async (req,res)=>{
    console.log('inside project controller');

    const {title,language,github,website,overview} = req.body

    console.log(title,language,github,website,overview);

    const projectImage=req.file.filename
    console.log(projectImage);

    const userId = req.payload

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('project already exist')
        }
        else{
            const newProject = new projects({
                title ,language ,github ,website ,overview , projectImage , userId
            })

            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json('project adding failed due to'+error)
    }
    
    
   
}

// get all projects
exports.getAllProjectController = async (req,res)=>{

    const searchkey = req.query.search
    console.log(searchkey);

    const query ={
        language :{
            $regex:searchkey, $options:"i"
        }
    }
    
    try {

        const allproject = await projects.find(query)
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error) 
    }
    
}
// get home project

exports.getHomeProjectController = async (req,res)=>{
    try {

        const allproject = await projects.find().limit(3)
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error) 
    }
    
}


// get user project

exports.getUserProjectController = async (req,res)=>{
    const userId = req.payload

    try {

        const allproject = await projects.find({userId})
        res.status(200).json(allproject)
        
    } catch (error) {
        res.status(401).json(error) 
    }
    
}

// remove user project

exports.removeUserProjectController = async(req,res)=>{
    const {id} = req.params

    try {
        await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted succesfully')
    } catch (error) {
        res.status(401).json(error) 
    }
}

// update user project

exports.editProjectcontroller = async(req,res)=>{
    // console.log("inside");
    
    const {id} = req.params
    const userId = req.payload

    const {title,language,github,website,overview,projectImage} = req.body
// console.log(title);

    const uploadedimage = req.file? req.file.filename : projectImage

    try {

        const existingProject = await projects.findByIdAndUpdate ({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:uploadedimage,
            userId
        },{new:true})
        console.log(existingProject);
        

        await existingProject.save()
    
        res.status(200).json(existingProject)
        
    } catch (error) {
        res.status(401).json(error)  
    }
}