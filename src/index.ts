import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { configs } from "./config/configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
// app.use(rateLimit({ windowMs: 2 * 60 * 1000, limit: 5 }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
// app.use("/cars", carRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, async () => {
  await mongoose.connect(configs.MONGO_URI);
  cronRunner();
  console.log(
    `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
  );
});
