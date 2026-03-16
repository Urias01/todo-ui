export const TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
  CANCELLED: "CANCELLED"
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskStatusLabel = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em progresso",
  FINISHED: "Concluído",
  CANCELLED: "Cancelado"
};
