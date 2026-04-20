import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../errorHelpers/AppError.js";
import httpStatus from "http-status-codes";
const createUser = catchAsync(async (req, res, next) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Created Successfully",
        data: user,
    });
});
const updateUser = catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    if (!userId || Array.isArray(userId)) {
        throw new AppError(400, "Invalid user ID");
    }
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User Updated Successfully",
        data: user,
    });
});
const getAllUsers = catchAsync(async (req, res, next) => {
    const query = req.query;
    const result = await UserServices.getAllUsers(query);
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta,
    });
});
const getMe = catchAsync(async (req, res, next) => {
    const decodedToken = req.user;
    const result = await UserServices.getMe(decodedToken.userId);
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data,
    });
});
const getSingleUser = catchAsync(async (req, res, next) => {
    const id = req.params?.id;
    if (!id || Array.isArray(id)) {
        throw new Error("Invalid user id");
    }
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Retrieved Successfully",
        data: result.data,
    });
});
export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
    getSingleUser,
};
//# sourceMappingURL=user.controller.js.map