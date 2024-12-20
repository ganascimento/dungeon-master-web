import { PvPWebSocket } from "../websocket/pvp.websocket";

export class PvPStore {
  async connect(): Promise<void> {
    await PvPWebSocket.start();
  }

  async disconnect(): Promise<void> {
    await PvPWebSocket.stop();
  }

  async create(name: string): Promise<void> {
    await PvPWebSocket.invoke("Create", name);
  }

  async join(roomId: string): Promise<void> {
    await PvPWebSocket.invoke("Join", roomId);
  }

  async leave(roomId: string): Promise<void> {
    await PvPWebSocket.invoke("Leave", roomId);
  }

  async chooseCharacter(roomId: string, characterIds: string[]): Promise<void> {
    await PvPWebSocket.invoke("ChooseCharacter", {
      roomId,
      characterIds,
    });
  }

  async ready(roomId: string): Promise<void> {
    await PvPWebSocket.invoke("Ready", roomId);
  }

  async start(roomId: string): Promise<void> {
    await PvPWebSocket.invoke("Start", roomId);
  }

  async attachRooms(func: any) {
    await PvPWebSocket.attachEvent("Rooms", func);
  }

  async attachRoomCreated(func: any) {
    await PvPWebSocket.attachEvent("RoomCreated", func);
  }

  async attachRoomCreateError(func: any) {
    await PvPWebSocket.attachEvent("RoomCreateError", func);
  }

  async attachRoomRemoved(func: any) {
    await PvPWebSocket.attachEvent("RoomRemoved", func);
  }

  async attachUpdateRoom(func: any) {
    await PvPWebSocket.attachEvent("UpdateRoom", func);
  }

  async attachUpdateCurrentRoom(func: any) {
    await PvPWebSocket.attachEvent("UpdateCurrentRoom", func);
  }

  async attachAdventureLoad(func: any) {
    await PvPWebSocket.attachEvent("AdventureLoad", func);
  }

  async attachAdventureStart(func: any) {
    await PvPWebSocket.attachEvent("AdventureStart", func);
  }
}
