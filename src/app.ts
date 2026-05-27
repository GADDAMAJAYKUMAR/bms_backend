import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";

import batteryRoutes from "./routes/battery.routes";
import authRoutes from "./routes/auth.routes";
import thermalRoutes from "./routes/thermalSafety.routes";
import { errorHandler } from "./middleware/errorHandler";
import passport
from "./config/passport";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  session({
    secret: "microsoft-secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());

app.use("/api/v1", batteryRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1", thermalRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

export default app;