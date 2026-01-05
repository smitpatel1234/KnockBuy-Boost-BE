import { ErrorType,ErrorTypes } from "../../domain/globalTypes/globalTypes";
import {StatusCodes} from "../config/constants";
const statusCodeToErrorTypesDict:Record<number, ErrorType>={
     404:'NOT_FOUND',
     409:'CONFLICT',
     500:'NO_DATA_FOUND'

}
export class HttpError extends Error {
  field?: Record<string, unknown>
  override message = 'INTERNAL_SERVER_ERROR'
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  type: ErrorType | undefined

  constructor(error: {
    description?: string
    message: { field?: Record<string, unknown>; tag: string; }
    statusCode: number
    type?: ErrorType
  }) {
    super(error.description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = error.message.tag
    this.field = error.message.field ?? {}
    this.statusCode = error.statusCode

    this.type =
      error.type ??
      statusCodeToErrorTypesDict[error.statusCode] ??
      ErrorTypes.NO_DATA_FOUND
    Error.captureStackTrace(this)
  }
}
