import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MONGODB CONNECTION ERROR", err);
    process.exit(1);
  }
};

export default connectDB;
