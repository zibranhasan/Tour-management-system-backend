import AppError from "../../errorHelpers/AppError.js";
import { Role } from "./user.interface.js";
import { User } from "./user.model.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { userSearchableFields } from "./user.constant.js";
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await User.findOne({ email: email });
    console.log(isUserExist);
    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist!");
    }
    const hashedPassword = await bcryptjs.hash(password, Number(envVars.BCRYPT_SALT_ROUND));
    console.log(hashedPassword);
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest,
    });
    return user;
};
const updateUser = async (userId, payload, decodedToken) => {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        if (userId !== decodedToken.userId) {
            throw new AppError(401, "You are not authorized");
        }
    }
    const ifUserExist = await User.findById(userId);
    if (!ifUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }
    if (decodedToken.role === Role.ADMIN &&
        ifUserExist.role === Role.SUPER_ADMIN) {
        throw new AppError(401, "You are not authorized");
    }
    /**
     * email - can not update
     * name, phone, password address
     * password - re hashing
     *  only admin superadmin - role, isDeleted...
     *
     * promoting to superadmin - superadmin
     */
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
        }
        // if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
        //     throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        // }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
        }
    }
    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
};
const getAllUsers = async (query) => {
    const queryBuilder = new QueryBuilder(User.find(), query);
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();
    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
};
const getMe = async (userId) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user,
    };
};
const getSingleUser = async (id) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user,
    };
};
export const UserServices = {
    createUser,
    getAllUsers,
    updateUser,
    getMe,
    getSingleUser,
};
//# sourceMappingURL=user.service.js.map