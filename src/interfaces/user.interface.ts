import { OrderEnum } from "../enums/order.enum";
import { RoleEnum } from "../enums/role.enum";
import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  phone?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ISignIn = Pick<IUser, "email" | "password">;

export type IResetPasswordSend = Pick<IUser, "email">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };

export type IChangePassword = Pick<IUser, "password"> & { oldPassword: string };

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserListOrderByEnum;
}

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "age"
  | "role"
  | "avatar"
  | "isDeleted"
  | "isVerified"
>;

export interface IUserListResponse {
  data: IUserResponse[];
  total: number;
}
