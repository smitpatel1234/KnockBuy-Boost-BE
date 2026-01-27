import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import { SocketEvents } from "../../config/constants";
import { sendNotificationEmail } from "../email/sendEmail";
import { logger } from "../logger";
export class SocketService {
  private io: Server;

  constructor(server: HttpServer) {
    logger.info("Initializing SocketService...");

    this.io = new Server(server, {
      cors: {
        credentials: true,
        origin: "http://localhost:3000",
      },
    });
  }

  public initialize(): void {
    this.io.on("connection", (socket: Socket) => {
      logger.info(`New client connected: ${socket.id}`);
      socket.on("placeOrderEvent", () => {
        void sendNotificationEmail();
        this.io.emit("notifytoAdmindashboard", { message: "New order has been placed." });
        logger.info("placeOrderEvent received, notification email sent.");
      });

      socket.on("disconnect", () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });   
      this.registerDisconnect(socket);
    });
  }

  private registerDisconnect(socket: Socket): void {
    socket.on(SocketEvents.DISCONNECT, (reason: string) => {
      logger.info(`Socket disconnected: ${socket.id}, reason: ${reason}`);
    });
  }
}
