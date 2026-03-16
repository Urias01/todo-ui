import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { TaskResponse } from "@/features/tasks/types/task-response";
import { Calendar } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: TaskResponse;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      disabled: isDragging,
      data: { status: task.status }
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      className="p-4 space-y-3 cursor-pointer hover:shadow-md transition bg-zinc-50 dark:bg-zinc-700"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div>
        <h3 className="font-medium text-sm">{task.title}</h3>

        <p className="text-xs text-muted-foreground">{task.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{task.status}</Badge>

        <Badge variant="outline">{task.subtasks.length} subtask</Badge>
      </div>

      <div className="flex items-center text-xs text-muted-foreground gap-1">
        <Calendar size={14} />
        {formatDate(task.createdAt)}
      </div>
    </Card>
  );
}

function formatDate(date: Date | string | undefined) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
