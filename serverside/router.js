import { Router } from "express";
import * as user from "./requestHandler.js";
import multer from "multer";
import path from "path"
const router=Router();
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6)
        cb(null, path.parse(file.originalname).name + '-' +uniqueSuffix+path.extname(file.originalname) )
      }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error("Only images are allowed"),false)
    }
};
const upload =multer({
    storage:storage,
    fileFilter:fileFilter
});

router.route("/upload").post(upload.single('file'),user.addUser);
router.route("/getusers").get(user.getUsers);
router.route("/image/:filename").get((req,res)=>{
    const {filename}=req.params;
    return res.sendFile(path.resolve(`./uploads/${filename}`))
});
router.route("/deleteuser/:_id").delete(user.deleteUser);
router.route("/getuser/:_id").get(user.getUser)
router.route("/edit").put(upload.single('file'),user.editUser);

export default router;