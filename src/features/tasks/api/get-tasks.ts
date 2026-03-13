import { api } from "@/lib/axios";
import type { TaskResponse } from "../types/task-response";

export async function getTasks(): Promise<TaskResponse[]> {
  const response = await api.get("/tasks").then((response) => {
    return response.data.data;
  });

  return response;
}
