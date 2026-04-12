import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interface.js";
import { User } from "../user/user.model.js";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userTokens.js";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env.js";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email: email! });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }
  // console.log("isUserExist", isUserExist);
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string,
  );
  // console.log("isPasswordMatched", isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const userTokens = createUserTokens(isUserExist);

  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken =
    await createNewAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (
  payload: Record<string, any>,
  decodedToken: JwtPayload,
) => {
  console.log("payload", payload);
  console.log("decodedToken", decodedToken);
  // if (payload.id != decodedToken.userId) {
  //   throw new AppError(401, "You can not reset your password");
  // }

  const isUserExist = await User.findById(decodedToken.userId);
  if (!isUserExist) {
    throw new AppError(401, "User does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    payload.oldPassword,
    isUserExist.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(400, "Old password is incorrect");
  }

  const hashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  isUserExist.password = hashedPassword;

  await isUserExist.save();
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
