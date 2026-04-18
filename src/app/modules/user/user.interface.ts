import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

//auth providers
/**
 * email, password
 * google authentication
 */

export interface IAuthProvider {
  provider: "google" | "credentials"; // "Google", "Credential"
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;

  name: string;
  email: string | undefined; // ✅ KEY FIX

  password?: string;
  phone?: string;
  picture?: string;
  address?: string;

  isDeleted?: boolean; // ⚠️ also fix this (was wrong before)
  isActive?: IsActive;
  isVerified?: boolean;

  role?: Role; // optional (default exists)
  auths?: IAuthProvider[]; // optional

  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];

  createdAt?: Date;
}
