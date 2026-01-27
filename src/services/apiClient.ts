import type { Validator } from "../types/validator";
import { createApiError } from "../error/errorHandler";
import { logger } from "./logger";
import type { ApiOptions } from "../types/api";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function apiClient<TResponse,TBody=undefined>(
    endpoint:string,
    options:ApiOptions<TBody>={},
    validate?:Validator<TResponse>

):Promise<TResponse>{
    const res=await fetch(`${BASE_URL}${endpoint}`,{
        method:options.method??"GET",
        headers:{
            "Content-Type":"application/json",
            ...options.headers,
        },
        body:options.body?JSON.stringify(options.body):undefined,
    });
    
    logger.info("API Request",{
        endpoint,
        options,
    })
    if(!res.ok){
        let message="Request failed";
        const errorBody = await res.json().catch(() => null);
        try{
            const data=await res.json();
            message=data?.message??message;
        } catch{
            logger.warn("API request failed",{
                endpoint,
                options,
                status:res.status,
                errorBody,
            })
            throw createApiError(res.status,message);
        }

    }
    return res.json() as Promise<TResponse>;
}

