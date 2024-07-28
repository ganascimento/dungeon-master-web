import { RaceType } from "../../@types/app.types";
import { Api } from "./base";

export class RaceStore {
  async getAll(): Promise<RaceType[] | undefined> {
    const result = await Api.get(`/race`);
    return result.data;
  }
}
