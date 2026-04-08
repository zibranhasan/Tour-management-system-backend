import type { NextFunction, Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthServices } from "./auth.service.js";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await UserServices.createUser(req.body);

    const loginInfo = await AuthServices.credentialsLogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Created Successfully",
      data: loginInfo,
    });
  },
);

export const AuthControllers = {
  credentialsLogin,
};
