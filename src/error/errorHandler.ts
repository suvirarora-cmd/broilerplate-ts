import type { AppError } from "../types/error";
import { logger } from "../services/logger";

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

    if (isAppError(error)) {
        logger.error(error.message, {
            source: error.source,
            statusCode: error.statusCode,
        });
        return error;
    } else if (error instanceof Error) {
        logger.error(error.message, {
            source: "RUNTIME",
            statusCode: 500,
        });
        return {
            source: "RUNTIME",
            message: error.message,
            statusCode: 500,
        };
    } else {
        logger.error("Unknown error type", {
            source: "UNKNOWN",
            statusCode: 500,
        });
        return {
            source: "UNKNOWN",
            message: "An unknown error occurred",
            statusCode: 500,
        };
    }
}

export function handleError(error:AppError){
    if(import.meta.env.DEV){
        if(import.meta.env.DEV){
            console.error("[AppError]",error);
        }
    }
}