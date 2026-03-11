import { Response } from "express";

import { StatusCodes } from "../config/constants";
export const displaymessage = (
    StatusCodes: number,
    res: Response,
    message?: string | string[],
    data?: unknown
) => {
    const success = StatusCodes < 400;
    res.status(StatusCodes).json({ data, message, success });
}

export const successmessage = (
    res: Response,
    message?: string,
    data?: unknown
) => {
    if (message) { displaymessage(StatusCodes.OK, res, message, data); return; }
    displaymessage(StatusCodes.OK, res, "Request is successful", data);

}

