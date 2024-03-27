process.loadEnvFile(".env");

import mongoose from "mongoose";
import connectDB from "./db/index.js";

connectDB();