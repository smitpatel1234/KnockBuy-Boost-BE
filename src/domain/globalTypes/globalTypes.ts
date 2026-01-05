export interface HttpErrorResponse {
    details?:string
    status:number
    title:string
    type?:string;
}
export interface HttpSuccessResponse<T> {
    data?: T;
    message: string;
    statusCode: number;
}

export const ErrorTypes = {
  CONFLICT: 'CONFLICT',
  NO_DATA_FOUND: 'NO_DATA_FOUND',
  NOT_FOUND: 'NOT_FOUND',
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]