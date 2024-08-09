import { AdventureType, TalkRequestType } from "../../@types/app.types";
import { Api } from "./base";

export class TalkStore {
  async getPlot(key: string): Promise<string | undefined> {
    const result = await Api.get(`/talk/plot`, {
      params: {
        key,
      },
    });

    return result.data;
  }

  async sendMessag(
    adventureId: string,
    data: TalkRequestType
  ): Promise<AdventureType | undefined> {
    const result = await Api.post(`/talk/message/${adventureId}`, data);
    return result.data;
  }
}
