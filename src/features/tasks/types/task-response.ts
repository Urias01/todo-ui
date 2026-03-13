export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  createdBy: unknown;
  subtasks: TaskResponse[];
  finishDate: Date;
  createdAt: Date;
}
