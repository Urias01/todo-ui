import { api } from "@/lib/axios";
import type { UserResponse } from "../types/response/user-response";

export async function getCurrentUser(): Promise<UserResponse> {
  return await api.get("/users/me").then((response) => {
    return response.data.data;
  });
}
