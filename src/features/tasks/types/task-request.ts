import type { TaskStatus } from "./task-status";

export interface TaskRequest {
  title: string;
  description: string;
  userIds: string[];
  status: TaskStatus;
}
