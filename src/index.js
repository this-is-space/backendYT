process.loadEnvFile(".env");

import connectDB from "./db/index.js";
import express from "express";

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Failed ", err);
  });
