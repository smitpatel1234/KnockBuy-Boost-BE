"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFilesController = void 0;
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const uploadMultipleFilesController = (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "No files uploaded");
    }
    const host = req.get("host") ?? "localhost";
    const baseUrl = `${req.protocol}://${host}`;
    const fileUrls = files.map((file) => ({
        filename: file.filename ?? "unknown",
        url: `${baseUrl}/uploads/${file.filename ?? ""}`,
    }));
    if (fileUrls.length === 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "No files uploaded");
    }
    const { type } = req.query;
    if (type === "user" || type === "category") {
        (0, displaymessage_1.successmessage)(res, "File uploaded successfully", fileUrls[0]);
        return;
    }
    (0, displaymessage_1.successmessage)(res, "Files uploaded successfully", fileUrls);
};
exports.uploadMultipleFilesController = uploadMultipleFilesController;
