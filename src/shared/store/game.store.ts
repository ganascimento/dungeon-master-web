import { CharacterActionRequestType } from "../../@types/app.types";
import { GameWebSocket } from "../websocket/game.websocket";

export class GameStore {
  async connect(): Promise<void> {
    await GameWebSocket.start();
  }

  async disconnect(): Promise<void> {
    await GameWebSocket.stop();
  }

  async attachAdventure(adventureId: string): Promise<void> {
    await GameWebSocket.invoke("AttachAdventure", adventureId);
  }

  async startBattle(): Promise<void> {
    await GameWebSocket.invoke("StartBattle");
  }

  async characterAction(message: CharacterActionRequestType): Promise<void> {
    await GameWebSocket.invoke("CharacterAction", message);
  }

  async characterEndTurn(): Promise<void> {
    await GameWebSocket.invoke("CharacterEndTurn");
  }

  async attachActionResult(func: any) {
    await GameWebSocket.attachEvent("ActionResult", func);
  }

  async attachStartBattleLoading(func: any) {
    await GameWebSocket.attachEvent("StartBattleLoading", func);
  }
}
