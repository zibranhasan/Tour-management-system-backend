import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { router } from "./app/routes/index.js";
import { envVars } from "./app/config/env.js";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import httpStatus from "http-status-codes";
import { success } from "zod";
import notFound from "./app/middlewares/notFound.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System Backend!!!",
  });
});

app.use(globalErrorHandler);
app.use( notFound)
export default app;
