import { api } from "@/lib/axios";

export interface CreateSubtaskRequest {
  id: string;
  title: string;
}

export async function createSubtask({ id, title }: CreateSubtaskRequest) {
  await api.post(`/tasks/${id}/subtask`, {
    title
  });
}
