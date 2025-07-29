import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_URI)
            console.log("MongoDB connected successfully"); 
    }catch(error){
        console.log("MongoDB connection failed", error);
        process.exit(1); // Exit the process with failure
    }
}