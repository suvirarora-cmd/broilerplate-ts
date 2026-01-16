// src/features/auth/hooks/useAuth.ts
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./api";
import { loginSuccess, logout as logoutAction } from "./slice";
import { selectIsAuthenticated } from "./selectors";
import type { LoginRequest } from "./types";
import { normalizeError,handleError } from "../../services/errorHandler";

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (data: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      
      const response = await authApi.login(data);

      // update global auth state
      dispatch(loginSuccess(response.token));

      return response;

    } catch (err) {
      const appError=normalizeError(err);
      handleError(appError)
      setError(appError.message)

      throw appError;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authApi.logout();
    } finally {
      dispatch(logoutAction());
      setLoading(false);
    }
  }, [dispatch]);

  return {
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  } as const;
}
