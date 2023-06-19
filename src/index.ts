import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import { authenticateAdmin } from "./utils/middlewares";
import { PORT } from "./utils/config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({
    message: "Subscriptions API",
  });
});

app.use("/user", userRouter);
app.use("/admin", authenticateAdmin, adminRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
