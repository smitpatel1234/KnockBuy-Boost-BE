"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFilesController = void 0;
const GlobelErrorHandler_1 = require("../../../infrastructure/helper/middleware/GlobelErrorHandler");
const displaymessage_1 = require("../../../infrastructure/helper/displaymessage");
const uploadMultipleFilesController = async (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "No files uploaded");
    }
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrls = files.map((file) => ({
        filename: file.filename,
        url: `${baseUrl}/uploads/${file.filename}`,
    }));
    if (fileUrls.length === 0) {
        throw new GlobelErrorHandler_1.ApplicationError(GlobelErrorHandler_1.ApplicationErrorType.BAD_REQUEST, "No files uploaded");
    }
    return (0, displaymessage_1.successmessage)(res, "Files uploaded successfully", fileUrls);
};
exports.uploadMultipleFilesController = uploadMultipleFilesController;
