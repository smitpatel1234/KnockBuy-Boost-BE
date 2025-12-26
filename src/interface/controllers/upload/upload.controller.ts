import Express from "express";
import {
  ApplicationError,
  ApplicationErrorType,
} from "../../../infrastructure/helper/middleware/GlobelErrorHandler";
import { successmessage } from "../../../infrastructure/helper/displaymessage";

export const uploadMultipleFilesController = async (
  req: Express.Request,
  res: Express.Response
) => {
  const files: any = req.files;
  if (!files || files.length === 0) {
    throw new ApplicationError(
      ApplicationErrorType.BAD_REQUEST,
      "No files uploaded"
    );
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const fileUrls = files.map((file: any) => ({
    filename: file.filename,
    url: `${baseUrl}/uploads/${file.filename}`,
  }));
  if (fileUrls.length === 0) {
    throw new ApplicationError(
      ApplicationErrorType.BAD_REQUEST,
      "No files uploaded"
    );
  }
  return successmessage(res, "Files uploaded successfully", fileUrls);
};
