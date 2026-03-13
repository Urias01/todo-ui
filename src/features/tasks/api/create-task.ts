import { api } from "@/lib/axios";
import type { TaskRequest } from "../types/task-request";

export async function createTask({
  title,
  description,
  userIds,
  status
}: TaskRequest) {
  await api.post("/tasks", {
    title,
    description,
    userIds,
    status
  });
}
