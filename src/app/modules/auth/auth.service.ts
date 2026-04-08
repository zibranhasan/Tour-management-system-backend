import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwt.js";
import { envVars } from "../../config/env.js";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email: email! });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }
  console.log("isUserExist", isUserExist);
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string,
  );
  console.log("isPasswordMatched", isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

  //   const userTokens = createUserTokens(isUserExist);

  // delete isUserExist.password;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password: pass, ...rest } = isUserExist.toObject();

  return {
    // accessToken: userTokens.accessToken,
    // refreshToken: userTokens.refreshToken,
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
