import { CharacterActionRequestType } from "../../@types/app.types";
import { SignalRWebSocket } from "../websocket/signalr.websocket";

export class GameStore {
  async startBattle(adventureId: string): Promise<void> {
    await SignalRWebSocket.invoke("StartBattle", adventureId);
  }

  async characterAction(message: CharacterActionRequestType): Promise<void> {
    await SignalRWebSocket.invoke("CharacterAction", message);
  }

  async characterEndTurn(adventureId: string): Promise<void> {
    await SignalRWebSocket.invoke("CharacterEndTurn", adventureId);
  }

  async attachActionResult(func: any) {
    await SignalRWebSocket.attachEvent("ActionResult", func);
  }
}
