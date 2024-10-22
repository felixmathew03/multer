import userSchema from './models/user.model.js';


export async function addUser(req,res) {
    try {
        const image=req.file
        console.log(req.file);
        const {email,username,phone}=req.body;
        console.log(email,username,phone);
        res.status(201).send({msg:"successs"})
        userSchema
            .create({email,username,phone,image})
            .then(()=>{
                return res.status(201).send({msg:"successs"})
            })
            .catch((error)=>{
                return res.status(404).send({msg:"user not added"})
            })
    } catch (error) {
        res.status(404).send(error);
    }
}