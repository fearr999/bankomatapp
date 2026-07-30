import "dotenv/config";
import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { workOrdersRouter } from "./modules/workorders/workorders.routes.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.routes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/work-orders", workOrdersRouter);
app.use("/dashboard", dashboardRouter);

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`FSM API запущен на http://localhost:${port}`);
});
