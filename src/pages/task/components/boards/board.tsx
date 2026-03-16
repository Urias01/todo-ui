import { TaskStatus } from "@/features/tasks/types/task-status";
import { Column } from "./column";
import type { TaskResponse } from "@/features/tasks/types/task-response";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent
} from "@dnd-kit/core";
import { useState } from "react";
import { TaskCard } from "./task-card";
import { useMutation } from "@tanstack/react-query";
import { updateTaskStatus } from "@/features/tasks/api/update-task-status";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

interface BoardProps {
  tasks: TaskResponse[];
}

export function Board({ tasks }: BoardProps) {
  const [activeTask, setActiveTask] = useState<TaskResponse | null>(null);

  const pending = tasks.filter((t) => t.status === TaskStatus.PENDING);
  const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS);
  const finished = tasks.filter((t) => t.status === TaskStatus.FINISHED);
  const cancelled = tasks.filter((t) => t.status === TaskStatus.CANCELLED);

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);

    if (task) {
      setActiveTask(task);
    }
  }

  const { mutateAsync: updateTaskStatusFn } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id.toString();

    const oldStatus = active.data.current?.status;
    const newStatus = over.data.current?.status;

    if (!newStatus || oldStatus === newStatus) {
      setActiveTask(null);
      return;
    }

    updateTaskStatusFn({ id: taskId, status: newStatus }).then(() => {
      toast.success("Status atualizado com sucesso!");
    });

    setActiveTask(null);
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid lg:grid-cols-4 gap-4">
        <Column status={TaskStatus.PENDING} tasks={pending} />

        <Column status={TaskStatus.IN_PROGRESS} tasks={inProgress} />

        <Column status={TaskStatus.FINISHED} tasks={finished} />

        <Column status={TaskStatus.CANCELLED} tasks={cancelled} />

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
