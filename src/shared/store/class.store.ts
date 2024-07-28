import { ClassType } from "../../@types/app.types";
import { Api } from "./base";

export class ClassStore {
  async getAll(): Promise<ClassType[] | undefined> {
    const result = await Api.get(`/class`);
    return result.data;
  }
}
