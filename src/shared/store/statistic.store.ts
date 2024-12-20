import {
  StatisticBattleType,
  StatisticCharacterType,
  StatisticPvPType,
} from "../../@types/app.types";
import { Api } from "./base";

export class StatisticStore {
  async getDifficuty(): Promise<StatisticBattleType[]> {
    const result = await Api.get("/statistic/difficuty");
    return result.data;
  }

  async getPvP(): Promise<StatisticPvPType[]> {
    const result = await Api.get("/statistic/pvp");
    return result.data;
  }

  async getRace(): Promise<StatisticCharacterType[]> {
    const result = await Api.get("/statistic/race");
    return result.data;
  }

  async getClass(): Promise<StatisticCharacterType[]> {
    const result = await Api.get("/statistic/class");
    return result.data;
  }
}
