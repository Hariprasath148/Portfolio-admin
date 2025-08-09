import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connectDB.js"
import projectRoute from "./routers/project.route.js";
import userRoute from "./routers/auth.route.js";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRECT_API_KEY,
}
);
const PORT = process.env.PORT || 5500;
const app = express();
const _dirname = path.resolve();

connectDB();
app.use(express.json({
    limit : "20mb"
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.APPLICATION_URL,
    credentials: true
}));

app.use("/api/project",projectRoute);
app.use("/api/auth",userRoute);
app.get("/",async(req,res)=> {
    res.send("from the server");
})

// if(process.env.NODE_ENV == "production") {
// //     app.use(express.static(path.join(_dirname,"/frontend/dist")));
// //     app.get("/*",(req,res)=>{res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))});
// // }

app.listen(PORT,()=>{
    console.log("The server is running in the port :",PORT);
});
