import { api } from "@/lib/axios";
import type { TaskStatus } from "../types/task-status";

export interface UpdateTaskRequest {
  id: string;
  status: TaskStatus;
}

export async function updateTaskStatus({ id, status }: UpdateTaskRequest) {
  await api.patch(`/tasks/${id}`, {
    status
  });
}
