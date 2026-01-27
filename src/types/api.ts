export interface ApiOptions<T>{
    method?:"GET"| "POST"|"PUT"|"DELETE";
    body?:T;
    headers?:Record<string,string>;
}
