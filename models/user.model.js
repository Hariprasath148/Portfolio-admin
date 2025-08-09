import mongoose from "mongoose";
import { projectSchema } from "./projects.model.js";

const socialSchema = new mongoose.Schema({
    Platform : {
        type : String
    },
    Link : {
        type : String
    }
})

const userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String,
        required : true,
        minLength : true
    },
    SocialLinks : [socialSchema],
    Project : [projectSchema]
},{ timestamps : true });

const User = mongoose.model("User",userSchema);

export default User;