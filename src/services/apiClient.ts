import type { Validator } from "../types/validator";


export interface ApiError{
    message:string;
    status?:number;
}

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
    const res=await fetch(endpoint,{
        method:options.method??"GET",
        headers:{
            "Content-Type":"application/json",
            ...options.headers,
        },
        body:options.body?JSON.stringify(options.body):undefined,
    });
    const data=await res.json();

    if (validate && !validate(data)) {
    throw {
      message: "Invalid API response structure",
      status: 500,
    };
}
return data;

}