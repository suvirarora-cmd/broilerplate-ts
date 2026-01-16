import type { AppError } from "../types/error";

export function createApiError(
    status:number,
    message:string,
    cause?:unknown
): AppError{
    return{
        source:"API",
        message,
        statusCode:status,
        cause,
    };
}

function isAppError(error:unknown): error is AppError{
    return (
        typeof error === "object" &&
        error!==null &&
        "source" in error && 
        "message" in error
    );
}

export function normalizeError(error:unknown): AppError{
    if(isAppError(error)){
        return error;
    }

    if(error instanceof Error){
        return {
            source:"RUNTIME",
            message:error.message,
            cause:error,
        }
    }

    return {
        source:"UNKNOWN",
        message:"Unexpected error occured",
        cause:error,
    }
}

export function handleError(error:AppError){
    if(import.meta.env.DEV){
        if(import.meta.env.DEV){
            console.error("[AppError]",error);
        }
    }
}