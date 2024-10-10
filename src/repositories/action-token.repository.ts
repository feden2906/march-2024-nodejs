import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async create(dto: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }

  public async getByToken(token: string): Promise<IActionToken | null> {
    return await ActionToken.findOne({ token });
  }

  public async deleteManyByParams(
    params: Partial<IActionToken>,
  ): Promise<void> {
    await ActionToken.deleteMany(params);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
