import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { TaskStatus } from "@/features/tasks/types/task-status";
import { Calendar } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  quantitySubtask: number;
  createdAt: Date;
}

export function TaskCard({
  title,
  description,
  status,
  quantitySubtask,
  createdAt
}: TaskCardProps) {
  return (
    <Card className="p-4 space-y-3 cursor-pointer hover:shadow-md transition bg-zinc-50 dark:bg-zinc-700">
      <div>
        <h3 className="font-medium text-sm">{title}</h3>

        <p className="text-xs text-muted-foreground">
          {description && description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{status && status}</Badge>

        <Badge variant="outline">
          {quantitySubtask && quantitySubtask} subtask
        </Badge>
      </div>

      <div className="flex items-center text-xs text-muted-foreground gap-1">
        <Calendar size={14} />
        {formatDate(createdAt)}
      </div>
    </Card>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}
