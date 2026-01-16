export type ErrorSource="API"|"RUNTIME"|"REACT"|"ASYNC"|"UNKNOWN"

export interface AppError{
    source:ErrorSource;
    message:string;
    statusCode?:number;
    cause?:unknown;
}

