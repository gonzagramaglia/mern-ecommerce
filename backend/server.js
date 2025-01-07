import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/envar.js";

// app config
const app = express();

// middleware
app.use(cors()); // accepts requests from any frontend
app.use(express.json()); // parses requests to JSON

// db connection
connectDB();

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
