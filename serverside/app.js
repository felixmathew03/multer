const express=require("express");
const multer=require("multer");
const mongoose=require("mongoose");

const app=express();
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
      }
})
const upload =multer({storage});
const port=3000;
app.post('/api/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.send("Successfully uploaded....!!")
  })

  app.listen(port,()=>{
    console.log(`http://localhost:3000/api/upload`);
    
  })