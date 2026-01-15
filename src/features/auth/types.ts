export interface LoginRequest{
    emaill:string;
    password:string;
}

export interface User{
    id:string;
    email:string;
}

export interface LoginResponse{
    token:string;
    user:User;
}