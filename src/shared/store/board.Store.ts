import { AdventureType, BoardRequestType } from "../../@types/app.types";
import { Api } from "./base";

export class BoardStore {
  async sendPosition(
    data: BoardRequestType
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board`, data);
    return result.data;
  }
}
