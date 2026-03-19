import { api } from "@/lib/axios";
import type { TaskResponse } from "../types/task-response";

interface GetTaskDetailRequest {
  id: string;
}
export async function getTaskDetail({
  id
}: GetTaskDetailRequest): Promise<TaskResponse> {
  const response = await api.get(`/tasks/${id}`).then((response) => {
    return response.data.data;
  });

  return response;
}
