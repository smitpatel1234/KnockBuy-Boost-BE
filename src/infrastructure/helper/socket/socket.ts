import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { SocketEvents } from "../../config/constants";
import { logger } from "../logger";
import { sendNotificationEmail } from "../email/sendEmail";
export class SocketService {
  private io: Server;

  constructor(server: HttpServer) {
    logger.info("Initializing SocketService...");

    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });
  }

  private registerDisconnect(socket: Socket): void {
    socket.on(SocketEvents.DISCONNECT, (reason: string) => {
      logger.info(`Socket disconnected: ${socket.id}, reason: ${reason}`);
    });
  }

  public initialize(): void {
    this.io.on("connection", (socket: Socket) => {
      logger.info(`New client connected: ${socket.id}`);
      socket.on("placeOrderEvent", () => {
        sendNotificationEmail();
        this.io.emit("notifytoAdmindashboard", { message: "New order has been placed." });
        logger.info("placeOrderEvent received, notification email sent.");
      });

      socket.on("disconnect", () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });   
      this.registerDisconnect(socket);
    });
  }
}
