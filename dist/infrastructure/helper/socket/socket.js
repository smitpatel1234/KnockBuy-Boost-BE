"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const constants_1 = require("../../config/constants");
const logger_1 = require("../logger");
const sendEmail_1 = require("../email/sendEmail");
class SocketService {
    constructor(server) {
        logger_1.logger.info("Initializing SocketService...");
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true,
            },
        });
    }
    registerDisconnect(socket) {
        socket.on(constants_1.SocketEvents.DISCONNECT, (reason) => {
            logger_1.logger.info(`Socket disconnected: ${socket.id}, reason: ${reason}`);
        });
    }
    initialize() {
        this.io.on("connection", (socket) => {
            logger_1.logger.info(`New client connected: ${socket.id}`);
            socket.on("placeOrderEvent", () => {
                (0, sendEmail_1.sendNotificationEmail)();
                this.io.emit("notifytoAdmindashboard", { message: "New order has been placed." });
                logger_1.logger.info("placeOrderEvent received, notification email sent.");
            });
            socket.on("disconnect", () => {
                logger_1.logger.info(`Client disconnected: ${socket.id}`);
            });
            this.registerDisconnect(socket);
        });
    }
}
exports.SocketService = SocketService;
