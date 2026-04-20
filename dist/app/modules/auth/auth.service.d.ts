import { IsActive, type IAuthProvider, type IUser } from "../user/user.interface.js";
import { type JwtPayload } from "jsonwebtoken";
export declare const AuthServices: {
    credentialsLogin: (payload: Partial<IUser>) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string | undefined;
            phone?: string;
            picture?: string;
            address?: string;
            isDeleted?: boolean;
            isActive?: IsActive;
            isVerified?: boolean;
            role?: import("../user/user.interface.js").Role;
            auths?: IAuthProvider[];
            bookings?: import("mongoose").Types.ObjectId[];
            guides?: import("mongoose").Types.ObjectId[];
            createdAt?: Date;
            __v: number;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
    resetPassword: (payload: Record<string, any>, decodedToken: JwtPayload) => Promise<void>;
    setPassword: (userId: string, plainPassword: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map