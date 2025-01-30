import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const dbConnection = async () => {
    const mongoUrl: string = process.env.MONGO_URI!  

    if (!mongoUrl) {
        console.error('MongoDB connection URL is not defined.');
        process.exit(1);
      }
    mongoose.connect(mongoUrl).then(()=>{
        console.log('database connected..');
    })
    .catch((err)=>{
        console.log("Database connection error", err);  
    })
};