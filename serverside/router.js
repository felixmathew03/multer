import { Router } from "express";
import * as user from "./requestHandler.js";
import multer from "multer";
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix  + '-' +file.originalname )
      }
})

const upload =multer({storage});
const router=Router();

router.route("/upload").post(upload.single('file'),user.addUser);

export default router;