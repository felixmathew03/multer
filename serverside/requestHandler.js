import userSchema from './models/user.model.js';
import {promises as fs} from "fs"
import {fileURLToPath} from "url"
import {dirname,join} from "path"

export async function addUser(req, res) {
    try {
        const imagename = req.file.filename;
        const { email, username, phone } = req.body;
        // Create the user and send a response only after it's done
        await userSchema.create({ email, username, phone, imagename });
        res.status(201).send({ msg: "success" });
        
    } catch (error) {
        console.error(error); // Optional: Log the error for debugging
        res.status(403).send({ msg: "user not added" });
    }
}

export async function getUsers(req,res) {
    try {
        const users= await userSchema.find();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(404).send({msg:error})
    }   
}

export async function deleteUser(req,res) {
    const {_id}=req.params;
    const user=await userSchema.findOne({_id});
    if(!user)
        return res.status(500).send({msg:"user not available"});
    //get current file directory
    const __filename=fileURLToPath(import.meta.url)
    const __dirname=dirname(__filename);
    const fullpath=join(__dirname,"/uploads/",user.imagename)
    await fs.unlink(fullpath);
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send({msg:"deleted"})
    }).catch((error)=>{
        res.status(404).send({msg:error});
    })
}

export async function getUser(req,res) {
    try {
        const {_id}=req.params;
        const user= await userSchema.findOne({_id});
        return res.status(200).send(user)
    } catch (error) {
        return res.status(404).send({msg:error})
    }   
}

export async function editUser(req, res) {
    try {
        const image = req.file;
        console.log(req.file);
        const { email, username, phone } = req.body;
        console.log(email, username, phone);

        // Create the user and send a response only after it's done
        await userSchema.updateOne({email},{$set:{ email, username, phone, image }});
        res.status(201).send({ msg: "success" });
        
    } catch (error) {
        console.error(error); // Optional: Log the error for debugging
        res.status(403).send({ msg: "user not updated" });
    }
}