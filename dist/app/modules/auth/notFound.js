import httpStatus from "http-status-codes";
import {} from "express";
const notFound = (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route Not Found",
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map