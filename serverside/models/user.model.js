import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    phone:{type:Number},
    imagename:{type:String}
})
export default mongoose.model.Users||mongoose.model("User",userSchema);