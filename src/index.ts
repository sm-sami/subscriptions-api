import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import { authenticateAdmin } from "./middlewares/auth";
import { PORT } from "./utils/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res, next) => {
      console.log(`DDoS Attempt from ${req.ip}`);
      res.status(429).json({
        error: "Too many requests in a short time. Please try in a minute.",
      });
    },
  })
);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    message: "Subscriptions API",
  });
});

app.get("/healthcheck", (req, res) => {
  res.json({
    message: "Server is running",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/user", userRouter);
app.use("/admin", authenticateAdmin, adminRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
