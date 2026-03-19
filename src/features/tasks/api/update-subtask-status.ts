import { api } from "@/lib/axios";
import type { TaskStatus } from "../types/task-status";

export interface UpdateSubtaskRequest {
  id: string;
  taskId: string;
  status: TaskStatus;
}

export async function updateSubtaskStatus({
  id,
  taskId,
  status
}: UpdateSubtaskRequest) {
  await api.patch(`/tasks/${taskId}/subtask/${id}`, {
    status
  });
}
