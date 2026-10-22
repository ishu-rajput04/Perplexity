import mongoose from "mongoose";

function connectToDB() {
    try { 
        mongoose.connect(process.env.MONGO_URI).then(() => { console.log("MongoDB connected successfully"); })

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDB;