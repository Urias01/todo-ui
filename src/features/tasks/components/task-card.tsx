import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  quantitySubtask: number;
  createdAt: Date;
}

export function TaskCard(task: TaskCardProps) {
  return (
    <Card className="p-4 space-y-3 cursor-pointer hover:shadow-md transition bg-zinc-50 dark:bg-zinc-700">
      <div>
        <h3 className="font-medium text-sm">{task.title && task.title}</h3>

        <p className="text-xs text-muted-foreground">
          {task.description && task.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{task.status && task.status}</Badge>

        <Badge variant="outline">
          {task.quantitySubtask && task.quantitySubtask} subtask
        </Badge>
      </div>

      <div className="flex items-center text-xs text-muted-foreground gap-1">
        <Calendar size={14} />
        {formatDate(task.createdAt)}
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
