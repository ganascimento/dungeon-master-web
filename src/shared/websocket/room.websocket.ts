import * as signalR from "@microsoft/signalr";
import { getToken } from "../security/authentication";
import { HubConnectionState } from "@microsoft/signalr";

export class RoomWebSocket {
  private static connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/roomhub", {
      accessTokenFactory: () => getToken() as string,
    })
    .build();

  static async start(): Promise<void> {
    await this.connection.start();
  }

  static async stop(): Promise<void> {
    if (
      this.connection &&
      this.connection.state === HubConnectionState.Connected
    )
      await this.connection.stop();
  }

  static async invoke(target: string, message: any): Promise<void> {
    if (
      !this.connection ||
      this.connection.state === HubConnectionState.Disconnected
    )
      await RoomWebSocket.start();

    await this.connection.invoke(target, message);
  }

  static async attachEvent(target: string, func: any): Promise<void> {
    this.connection.off(target);
    this.connection.on(target, func);
  }
}
