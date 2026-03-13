import type { TaskStatus } from "./task-status";

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: unknown;
  subtasks: TaskResponse[];
  finishDate: Date;
  createdAt: Date;
}
