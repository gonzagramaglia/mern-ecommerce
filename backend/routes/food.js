import express from "express";
import { addFood, listFood, removeFood } from "../controllers/food.js";
import upload from "../config/cloudinary.js";

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);

export default foodRouter;
