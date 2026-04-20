import AppError from "../errorHelpers/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { envVars } from "../config/env.js";
export const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        // console.log("accessToken", accessToken);
        if (!accessToken) {
            throw new AppError(403, "No Token Received");
        }
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route !!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("jwt error", error);
    }
};
//# sourceMappingURL=checkAuth.js.map