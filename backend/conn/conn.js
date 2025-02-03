const mongoose = require("mongoose");
import dotenv from "dotenv";

dotenv.config();

import { process } from '../node_modules/ipaddr.js/lib/ipaddr.js.d';

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected Successfully");
    } catch (error) {
      console.error("MongoDB Connection Failed:", error);
      process.exit(1);
    }
  };
  
  export default connectDB;