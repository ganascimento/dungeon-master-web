import { SkillType } from "../../@types/app.types";
import { Api } from "./base";

export class SkillStore {
  async getByLevelAndClassAsync(
    level: number,
    classType: number
  ): Promise<SkillType[] | undefined> {
    const result = await Api.get(
      `/skill?level=${level}&classType=${classType}`
    );
    return result.data;
  }
}
