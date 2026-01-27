import Express from "express";

import { successmessage } from "../../../infrastructure/helper/displaymessage";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";

interface UploadedFile {
  filename?: string;
}

export const uploadMultipleFilesController = (
  req: Express.Request,
  res: Express.Response
): void => {
  const files = req.files as undefined | UploadedFile[];
  if (!files || files.length === 0) {
    throw new ApplicationError(
      ApplicationErrorType.BAD_REQUEST,
      "No files uploaded"
    );
  }

  const host = req.get("host") ?? "localhost";
  const baseUrl = `${req.protocol}://${host}`;

  const fileUrls = files.map((file) => ({
    filename: file.filename ?? "unknown",
    url: `${baseUrl}/uploads/${file.filename ?? ""}`,
  }));

  if (fileUrls.length === 0) {
    throw new ApplicationError(
      ApplicationErrorType.BAD_REQUEST,
      "No files uploaded"
    );
  }

  const { type } = req.query;

  if (type === "user" || type === "category") {
    successmessage(res, "File uploaded successfully", fileUrls[0]);
    return;
  }

  successmessage(res, "Files uploaded successfully", fileUrls);
};