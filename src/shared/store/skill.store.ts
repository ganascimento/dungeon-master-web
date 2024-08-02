import { SkillType } from "../../@types/app.types";
import { Api } from "./base";

export class SkillStore {
  async getAll(): Promise<SkillType[] | undefined> {
    const result = await Api.get(`/skill`);
    return result.data;
  }
}
