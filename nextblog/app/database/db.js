import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Successful!");
  } catch (error) {
    console.log("Database error: ", error);
    process.exit(1);
  }
}

export default connectDB;
