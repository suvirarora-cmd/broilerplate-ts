import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";

test("login sets error on failure", async () => {
  const { result } = renderHook(() => useAuth());

  await act(async () => {
    await result.current.login({ email: "x", password: "y" }).catch(() => {});
  });

  expect(result.current.error).toBeDefined();
});
