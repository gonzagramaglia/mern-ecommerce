import express from "express";
import cors from "cors";

// app config
const app = express();
const port = 8020;

//middleware
app.use(cors()); // accepts requests from any frontend
app.use(express.json()); // parses requests to JSON

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
