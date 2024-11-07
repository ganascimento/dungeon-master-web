import {
  AdventureType,
  CharacterActionRequestType,
} from "../../@types/app.types";
import { Api } from "./base";

export class BoardStore {
  async characterAction(
    data: CharacterActionRequestType
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board/action`, data);
    return result.data;
  }

  async characterEndTurn(
    adventureId: string
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board/endTurn?adventureId=${adventureId}`);
    return result.data;
  }
}
