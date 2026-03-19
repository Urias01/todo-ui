import { api } from "@/lib/axios";

interface DeleteSubtaskRequest {
  id: string;
  subtaskId: string;
}

export async function deleteSubtask({ id, subtaskId }: DeleteSubtaskRequest) {
  await api.delete(`/tasks/${id}/subtask/${subtaskId}`);
}
