import {
  AdventureType,
  CreateAdventureType,
  SaveAdventureCharacterType,
} from "../../@types/app.types";
import { Api } from "./base";

export class AdventureStore {
  async getAll(): Promise<AdventureType[] | undefined> {
    const result = await Api.get("/adventure");

    return result.data;
  }

  async getById(id: string): Promise<AdventureType | undefined> {
    const result = await Api.get(`/adventure/${id}`);
    return result.data;
  }

  async create(data: CreateAdventureType): Promise<void> {
    await Api.post("/adventure", data);
  }

  async characterLevelUp(
    data: SaveAdventureCharacterType
  ): Promise<AdventureType | null> {
    const result = await Api.put("/adventure/levelUp", data);
    return result.data;
  }

  async delete(adventureId: string): Promise<void> {
    await Api.delete(`/adventure/${adventureId}`);
  }
}
