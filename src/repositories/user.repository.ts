import { FilterQuery, SortOrder } from "mongoose";

import { UserListOrderByEnum } from "../enums/user-list-order-by.enum";
import { ApiError } from "../errors/api-error";
import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = {
      // isVerified: true
    };
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
      // filterObj.$or = [
      //   { name: { $regex: query.search, $options: "i" } },
      //   { email: { $regex: query.search, $options: "i" } },
      // ];
    }

    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserListOrderByEnum.NAME:
        sortObj.name = query.order;
        break;
      case UserListOrderByEnum.AGE:
        sortObj.age = query.order;
        break;
      case UserListOrderByEnum.CREATED:
        sortObj.createdAt = query.order;
        break;
      default:
        throw new ApiError("Invalid orderBy", 500);
    }

    const skip = query.limit * (query.page - 1);
    return await Promise.all([
      User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("+password");
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

  public async findWithOutActivity(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      { $match: { tokens: { $size: 0 } } },
    ]);
  }
}

export const userRepository = new UserRepository();
