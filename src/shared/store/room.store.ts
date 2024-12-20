import { RoomWebSocket } from "../websocket/room.websocket";

export class RoomStore {
  async connect(): Promise<void> {
    await RoomWebSocket.start();
  }

  async disconnect(): Promise<void> {
    await RoomWebSocket.stop();
  }

  async create(name: string): Promise<void> {
    await RoomWebSocket.invoke("Create", name);
  }

  async join(roomId: string): Promise<void> {
    await RoomWebSocket.invoke("Join", roomId);
  }

  async leave(roomId: string): Promise<void> {
    await RoomWebSocket.invoke("Leave", roomId);
  }

  async chooseCharacter(roomId: string, characterId: string): Promise<void> {
    await RoomWebSocket.invoke("ChooseCharacter", {
      roomId,
      characterId,
    });
  }

  async SelectDifficulty(
    roomId: string,
    difficultyLevel: number
  ): Promise<void> {
    await RoomWebSocket.invoke("SelectDifficulty", {
      roomId,
      difficultyLevel,
    });
  }

  async start(roomId: string): Promise<void> {
    await RoomWebSocket.invoke("Start", roomId);
  }

  async attachRooms(func: any) {
    await RoomWebSocket.attachEvent("Rooms", func);
  }

  async attachRoomCreated(func: any) {
    await RoomWebSocket.attachEvent("RoomCreated", func);
  }

  async attachRoomCreateError(func: any) {
    await RoomWebSocket.attachEvent("RoomCreateError", func);
  }

  async attachRoomRemoved(func: any) {
    await RoomWebSocket.attachEvent("RoomRemoved", func);
  }

  async attachUpdateRoom(func: any) {
    await RoomWebSocket.attachEvent("UpdateRoom", func);
  }

  async attachUpdateCurrentRoom(func: any) {
    await RoomWebSocket.attachEvent("UpdateCurrentRoom", func);
  }

  async attachAdventureLoad(func: any) {
    await RoomWebSocket.attachEvent("AdventureLoad", func);
  }

  async attachAdventureStart(func: any) {
    await RoomWebSocket.attachEvent("AdventureStart", func);
  }
}
