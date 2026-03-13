import { api } from "@/lib/axios";
import type { SignInRequest } from "../types/sign-in-request";
import type { SignInResponse } from "../types/sign-in-response";

export async function signIn({
  email,
  password
}: SignInRequest): Promise<SignInResponse> {
  const response = await api
    .post("/auth/sign-in", {
      email,
      password
    })
    .then((response) => {
      return response.data.data;
    });

  return response;
}
