// src/features/auth/hooks/useAuth.ts
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./api";
import { loginSuccess, logout as logoutAction } from "./slice";
import { selectIsAuthenticated } from "./selectors";
import type { LoginRequest } from "./types";

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.login(data);

      // update global auth state
      dispatch(loginSuccess(response.token));

      return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
      throw err;
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
