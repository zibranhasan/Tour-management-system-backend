/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
export const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB ObjectID. Please provide a valid id",
    };
};
//# sourceMappingURL=handleCastError.js.map