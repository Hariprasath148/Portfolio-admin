import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req , res) => {
    try {
        const {Name,Email,Password} = req.body;
        if(!Name , !Email , !Password) {
            console.log("Data is Missing");
            return res.status(400).json({error : "Enter all the Details"});
        }
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailregx.test(Email)) {
            console.log("Inavild Email Format");
            return res.status(400).json({error : "Invaild Email Format"});
        }
         
        const user = await User.findOne({Email});
        if(user) {
            console.log("Email is Already Registerd");
            return res.status(400).json({error :"Email is Already Registerd"});
        }
        if(Password.length < 6) {
            console.log("Password is too short");
            return res.status(400).json({error :"Password is too short"});
        }
        
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password,genSalt);

        const newUser = new User({
            Name,
            Email,
            Password : hashedPassword
        });

        if(newUser) {
            await newUser.save();
            generateToken(newUser._id,res);
            res.status(200).json({user:{
                Name : newUser.Name,
                Email : newUser.Email
            }})
        }
        else {
            res.status(400).json({message : "Invaild User"});
        }
    } catch (error) {
        console.log("Error from Signup Controller",error);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const logIn = async (req,res) => {
    try {
        const{Email , Password} = req.body;
        if(!Email , !Password) {
            console.log("Data is Missing");
            return res.status(400).json({error : "Enter all the Details"});
        }
        const user = await User.findOne({Email});
        const isPasswordCorrect = await bcrypt.compare(Password , user?.Password || "");
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error : "Invaild User Name or Password"});
        }
        generateToken(user._id,res);
        res.status(200).json({user : {
            Name : user.Name,
            Email : user.Email
        }})
    } catch (error) {
        console.log("Error form the login controller : ",error);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const logOut = async(req,res)=> {
    try {
        res.cookie("user","",{ maxAge : 0 });
        res.status(200).json("Logout Successfully");
    } catch (error) {
        console.log("Error from the LogOut Controller : ",error);
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const getUser = async (req,res) => {
    try {
        const user = await User.findOne({_id : req.user._id}).select("-Password");
        res.status(200).json({user});
    } catch (error) {
        console.log("Error in the GetUser : ",error);
        res.status(500).json({error : "Internal Server Error"});
    }
}