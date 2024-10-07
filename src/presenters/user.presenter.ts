import { configs } from "../config/configs";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
  IUserResponse,
} from "../interfaces/user.interface";

class UserPresenter {
  public toPublicResDto(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      age: entity.age,
      role: entity.role,
      avatar: entity.avatar
        ? `${configs.AWS_S3_ENDPOINT}/${entity.avatar}`
        : null,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
    };
  }

  public toListResDto(
    entities: IUser[],
    total: number,
    query: IUserListQuery,
  ): IUserListResponse {
    return {
      data: entities.map(this.toPublicResDto),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
