import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Sucessfully");
    } catch (error) {
        console.log("Enable to Connect to the Database.");
        process.exit(1);
    }
}

export default connectDB;