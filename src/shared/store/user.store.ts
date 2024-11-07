import {
  AuthTokenType,
  CreateUserType,
  LoginType,
} from "../../@types/app.types";
import { Api } from "./base";

export class UserStore {
  async signIn(data: LoginType): Promise<AuthTokenType | undefined> {
    try {
      const result = await Api.post(`/user/auth`, data);
      return result.data;
    } catch {
      throw new Error("User not found!");
    }
  }

  async createUser(data: CreateUserType): Promise<void> {
    await Api.post(`/user`, data);
  }
}
