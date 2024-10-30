import {
  AdventureType,
  BoardRequestType,
  CharacterMoveRequestType,
} from "../../@types/app.types";
import { Api } from "./base";

export class BoardStore {
  async sendPosition(
    data: BoardRequestType
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board`, data);
    return result.data;
  }

  async characterMove(
    data: CharacterMoveRequestType
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board/move`, data);
    return result.data;
  }

  async characterEndTurn(
    adventureId: string
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/board/endTurn?adventureId=${adventureId}`);
    return result.data;
  }

  async changeLocation(
    adventureId: string,
    locationId: string
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(
      `/board/changeLocation?adventureId=${adventureId}&locationId=${locationId}`
    );
    return result.data;
  }
}
