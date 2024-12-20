import { CharacterType } from "../../@types/app.types";
import { CharacterModeEnum } from "../../@types/constants.types";
import { Api } from "./base";

export class CharacterStore {
  async getAll(): Promise<CharacterType[] | undefined> {
    const result = await Api.get("/character");
    return result.data;
  }

  async getAllByMode(
    mode: CharacterModeEnum
  ): Promise<CharacterType[] | undefined> {
    const result = await Api.get(`/character/mode/${mode}`);
    return result.data;
  }

  async getById(id: string): Promise<CharacterType | undefined> {
    const result = await Api.get(`/character/${id}`);
    return result.data;
  }

  async save(character: CharacterType): Promise<void> {
    await Api.put("/character", {
      ...character,
      skillsIds: character.skills?.map((x) => x.id),
      raceId: character.race?.id,
      classId: character.class?.id,
    });
  }

  async savePvP(character: CharacterType): Promise<void> {
    await Api.put("/character/pvp", {
      ...character,
      skillsIds: character.skills?.map((x) => x.id),
      raceId: character.race?.id,
      classId: character.class?.id,
    });
  }

  async delete(data: CharacterType): Promise<void> {
    await Api.delete(`/character?id=${data.id}`);
  }
}
