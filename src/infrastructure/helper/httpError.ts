import {StatusCodes} from "../config/constants";
import { ErrorTypes,ErrorType } from "../../domain/globalTypes/globalTypes";
const statusCodeToErrorTypesDict:{[key:number]:ErrorType}={
     404:'NOT_FOUND',
     409:'CONFLICT',
     500:'NO_DATA_FOUND'

}
export class HttpError extends Error {
  override message = 'INTERNAL_SERVER_ERROR'
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  field?: { [key: string]: unknown }
  type: ErrorType | undefined

  constructor(error: {
    statusCode: number
    message: { tag: string; field?: { [key: string]: unknown } }
    description?: string
    type?: ErrorType
  }) {
    super(error.description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = error.message.tag
    this.field = error.message.field ? error.message.field : {}
    this.statusCode = error.statusCode

    this.type =
      error.type ??
      statusCodeToErrorTypesDict[error.statusCode] ??
      ErrorTypes.NO_DATA_FOUND
    Error.captureStackTrace(this)
  }
}
