import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  },
);

// const updateUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userId = req.params.id;
//     const token = req.headers.authorization;

//     if (!userId || Array.isArray(userId)) {
//       throw new AppError(400, "Invalid user ID");
//     }
//     const verifiedToken = req.user;

//     const payload = req.body;
//     const user = await UserServices.updateUser(
//       userId,
//       payload,
//       verifiedToken as JwtPayload,
//     );

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User Updated Successfully",
//       data: user,
//     });
//   },
// );

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

export const UserControllers = {
  createUser,
  getAllUsers,
  // updateUser,
};
