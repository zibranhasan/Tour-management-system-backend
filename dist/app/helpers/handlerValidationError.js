import mongoose from "mongoose";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const handlerValidationError = (err) => {
    const errorSources = [];
    const errors = Object.values(err.errors);
    errors.forEach((errorObject) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
//# sourceMappingURL=handlerValidationError.js.map