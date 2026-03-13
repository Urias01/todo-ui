import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { TaskStatus } from "@/features/tasks/types/task-status";
import type React from "react";

export interface columProps {
  status: TaskStatus;
  count: number;
  children: React.ReactNode;
}

export function Column({ status, count, children }: columProps) {
  const style = columnStyles[status];

  return (
    <Card
      className={`flex flex-col h-[70vh] ${style.border} ${style.background}`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle
          className={`flex items-center gap-2 text-sm font-medium ${style.header}`}
        >
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />

          {style.title}
        </CardTitle>

        <span className="text-xs bg-muted px-2 py-1 rounded-full">{count}</span>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 overflow-y-auto">
        {children}
      </CardContent>
    </Card>
  );
}

type ColumnStyle = {
  title: string;
  border: string;
  header: string;
  dot: string;
  background: string;
};

const columnStyles: Record<TaskStatus, ColumnStyle> = {
  PENDING: {
    title: "A Fazer",
    border: "border-zinc-200 dark:border-zinc-400",
    header: "text-zinc-700 dark:text-zinc-300",
    dot: "bg-zinc-400",
    background: "bg-zinc-50 dark:bg-zinc-600"
  },
  IN_PROGRESS: {
    title: "Em Progresso",
    border: "border-blue-200 dark:border-blue-400",
    header: "text-blue-700 dark:text-blue-200",
    dot: "bg-blue-500",
    background: "bg-blue-50 dark:bg-blue-700"
  },
  DONE: {
    title: "Concluído",
    border: "border-green-200 dark:border-green-400",
    header: "text-green-700 dark:text-green-200",
    dot: "bg-green-500",
    background: "bg-green-50 dark:bg-green-700"
  },
  CANCELLED: {
    title: "Cancelado",
    border: "border-red-200 dark:border-red-400",
    header: "text-red-700 dark:text-red-200",
    dot: "bg-red-500",
    background: "bg-red-50 dark:bg-red-700"
  }
};
