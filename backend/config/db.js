import mongoose from "mongoose";
import { MONGODB_URI } from "./envar.js";

export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI).then(() => console.log("DB Connected"));
};
