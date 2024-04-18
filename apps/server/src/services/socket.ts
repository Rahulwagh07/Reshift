// ref:https://github.com/piyushgarg-dev/Scaleable-WebSockets/tree/main

import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";
import {config as configDotenv} from "dotenv"

configDotenv();

const redisurl = process.env.REDIS_URL;
const pub = new Redis(`${redisurl}`);
const sub = new Redis(`${redisurl}`);

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("GROUPCHATS");
  }

  public initListeners() {
    const io = this.io;
    io.on("connect", (socket) => {
      socket.on("event:message", async ({ message }: { message: string }) => {
        await pub.publish("GROUPCHATS", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "GROUPCHATS") {
        io.emit("message", message);
        await produceMessage(message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;