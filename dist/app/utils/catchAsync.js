import { envVars } from "../config/env.js";
export const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (envVars.NODE_ENV !== "development") {
            console.log(err);
        }
        next(err);
    });
};
//# sourceMappingURL=catchAsync.js.map