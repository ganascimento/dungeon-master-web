import {
  AuthTokenType,
  CreateUserType,
  LoginType,
  UpdateUserType,
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

  async create(data: CreateUserType): Promise<void> {
    await Api.post(`/user`, data);
  }

  async update(data: UpdateUserType): Promise<void> {
    await Api.put("/user", data);
  }

  async checkUserExists(userName: string): Promise<boolean> {
    const result = await Api.get(`/user/exists/userName/${userName}`);
    return result.data;
  }
}
