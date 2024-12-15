import * as signalR from "@microsoft/signalr";
import { getToken } from "../security/authentication";
import { HubConnectionState } from "@microsoft/signalr";

export class SignalRWebSocket {
  private static connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/gamehub", {
      accessTokenFactory: () => getToken() as string,
    })
    .build();

  private static async start(): Promise<void> {
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
      await SignalRWebSocket.start();

    await this.connection.invoke(target, message);
  }

  static async attachEvent(target: string, func: any): Promise<void> {
    if (
      !this.connection ||
      this.connection.state === HubConnectionState.Disconnected
    )
      await SignalRWebSocket.start();

    this.connection.on(target, (a: any) => {
      console.log("event called", target);
      func(a);
    });
  }
}
