import { AdventureType, CharacterType } from "../../@types/app.types";
import { MapAdventure } from "../ultils/mapAdventure";
import { Api } from "./base";

export class AdventureStore {
  async getAll(): Promise<AdventureType[] | undefined> {
    const result = await Api.get("/adventure");

    return result.data;
  }

  async getById(id: string): Promise<AdventureType | undefined> {
    const result = await Api.get(`/adventure/${id}`);
    return MapAdventure(result.data);
  }

  async create(data: AdventureType): Promise<void> {
    await Api.post("/adventure", data);
  }

  async start(data: AdventureType): Promise<void> {
    await Api.post(`/adventure/${data.id}/start`);
  }

  async saveCharacter(
    adventureId: string,
    character: CharacterType
  ): Promise<void> {
    await Api.put(`/adventure/${adventureId}/character`, {
      ...character,
      skillsIds: character.skills?.map((x) => x.id),
      raceId: character.race?.id,
      classId: character.class?.id,
    });
  }
}
