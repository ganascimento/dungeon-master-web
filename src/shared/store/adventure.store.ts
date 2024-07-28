import { AdventureType, CharacterType } from "../../@types/app.types";
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

  async create(data: AdventureType): Promise<void> {
    await Api.post("/adventure", data);
  }

  async start(data: AdventureType): Promise<AdventureType | undefined> {
    const result = await Api.post(`/adventure/${data.id}/start`);
    return result.data;
  }

  async saveCharacter(
    adventureId: string,
    character: CharacterType
  ): Promise<void> {
    await Api.put(`/adventure/${adventureId}/character`, character);
  }
}
