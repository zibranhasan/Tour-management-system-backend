import type { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!";
  let errorDetails: any = null;

  // 🔥 ZOD ERROR HANDLING
  if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    errorDetails = err.issues; // ✅ clean output
  }

  // 🔥 CUSTOM ERROR
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 🔥 NORMAL ERROR
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errorDetails, // ✅ clean instead of raw err
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
