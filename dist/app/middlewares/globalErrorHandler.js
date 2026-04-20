import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
import { handlerDuplicateError } from "../helpers/handleDuplicateError.js";
import { handleCastError } from "../helpers/handleCastError.js";
import { handlerZodError } from "../helpers/handlerZodError.js";
import { handlerValidationError } from "../helpers/handlerValidationError.js";
import { deleteImageFromCLoudinary } from "../config/cloudinary.config.js";
export const globalErrorHandler = async (err, req, res, next) => {
    let errorSources = [];
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    console.log({ file: req.files });
    if (req.file) {
        await deleteImageFromCLoudinary(req.file.path);
    }
    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = req.files.map((file) => file.path);
        await Promise.all(imageUrls.map((url) => deleteImageFromCLoudinary(url)));
    }
    //Duplicate error
    if (err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Object ID error / Cast Error
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //Mongoose Validation Error
    else if (err.name === "ValidationError") {
        const simplifiedError = handlerValidationError(err);
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map