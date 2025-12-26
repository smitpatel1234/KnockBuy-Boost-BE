export type HttpSuccessResponse<T> = {
    data?: T;
    message: string;
    statusCode: number;
};
export type HttpErrorResponse ={
    type?:string;
    status:number
    title:string
    details?:string
}

export const ErrorTypes = {
  NOT_FOUND: 'NOT_FOUND',
  NO_DATA_FOUND: 'NO_DATA_FOUND',
  CONFLICT: 'CONFLICT',
} as const
export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes]