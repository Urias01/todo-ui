import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { TaskResponse } from "@/features/tasks/types/task-response";
import { Calendar, EyeIcon, GripVertical, TrashIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/features/tasks/api/delete-task";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

interface TaskCardProps {
  task: TaskResponse;
  isDragging?: boolean;
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
  const [, setParams] = useSearchParams();

  function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    setParams({ taskId: task.id });
  }

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

  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  async function handleDeleteTask(taskId: string) {
    await deleteTaskFn({ id: taskId }).then(() => {
      toast.success("Task deletada com sucesso");
    });
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 space-y-3 bg-zinc-50 dark:bg-zinc-700 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-sm">{task.title}</h3>

        <div className="flex items-center gap-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-600"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <Button size="icon" variant="ghost" onClick={handleOpen}>
            <EyeIcon className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => handleDeleteTask(task.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">{task.description}</p>

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
