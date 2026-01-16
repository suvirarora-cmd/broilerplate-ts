import { apiClient } from "../../services/apiClient";
import type { LoginRequest,LoginResponse,User } from "./types";


export const authApi={
    login(payload:LoginRequest){
        return apiClient<LoginResponse,LoginRequest>(
            "/auth/login",
            {
                method:"POST",
                body:payload,
            }
        );
    },

    logout(){
        return apiClient<void>("/auth/logout",
            {method:"POST",
    });
    },

    getProfile(){
        return apiClient<User>("/auth/me");
    },
};