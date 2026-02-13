import mongoose from "mongoose";

const connectDB = async function () {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection established...")
    } catch (error) {
        console.log("Error connecting to DB...")
        process.exit(1)
    }
}

export default connectDB
