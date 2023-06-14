import express from "express";
import { PORT } from "./utils/config";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
