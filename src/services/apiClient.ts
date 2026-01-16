import type { Validator } from "../types/validator";
import { createApiError } from "../error/errorHandler";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiOptions<T>{
    method?:"GET"| "POST"|"PUT"|"DELETE";
    body?:T;
    headers?:Record<string,string>;
}

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
    
    if(!res.ok){
        let message="Request failed";

        try{
            const data=await res.json();
            message=data?.message??message;
        } catch{}

        throw createApiError(res.status,message);
    }
    return res.json() as Promise<TResponse>;
}

