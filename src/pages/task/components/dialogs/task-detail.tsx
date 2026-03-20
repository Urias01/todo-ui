import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { getTaskDetail } from "@/features/tasks/api/get-task-details";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Calendar, PlusIcon, TrashIcon } from "lucide-react";
import { TaskDetailSkeleton } from "./task-detail-skeleton";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubtask } from "@/features/tasks/api/create-subtask";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TaskStatus } from "@/features/tasks/types/task-status";
import { updateSubtaskStatus } from "@/features/tasks/api/update-subtask-status";
import { deleteSubtask } from "@/features/tasks/api/delete-subtask";

interface TaskDetailProps {
  id: string;
}

const subtaskSchema = z.object({
  title: z.string()
});

type SubtaskSchema = z.infer<typeof subtaskSchema>;

const subtaskDefault: SubtaskSchema = {
  title: ""
};

const statusChangeSchema = z.object({
  status: z.enum(TaskStatus)
});

type StatusChangeSchema = z.infer<typeof statusChangeSchema>;

export function TaskDetail({ id }: TaskDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () => getTaskDetail({ id })
  });

  const task = data;

  const form = useForm<SubtaskSchema>({
    defaultValues: subtaskDefault,
    resolver: zodResolver(subtaskSchema)
  });

  const { register, handleSubmit } = form;

  const { mutateAsync: createSubtaskFn } = useMutation({
    mutationFn: createSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task"]
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  const changeStatusForm = useForm<StatusChangeSchema>({
    resolver: zodResolver(statusChangeSchema)
  });

  function handleCreateSubtask(data: SubtaskSchema) {
    createSubtaskFn({ id, title: data.title }).then(() => {
      toast.success("Subtask criada com sucesso");
    });
  }

  const { mutateAsync: updateSubtaskStatusFn } = useMutation({
    mutationFn: updateSubtaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  async function handleChangeStatus(
    subtaskId: string,
    taskId: string,
    status: TaskStatus
  ) {
    try {
      await updateSubtaskStatusFn({ id: subtaskId, taskId, status });
      toast.success("Status atualizado");
    } catch {
      toast.error("Erro ao atualizar status");
    }
  }

  const { mutateAsync: deleteSubtaskFn } = useMutation({
    mutationFn: deleteSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    }
  });

  async function handleDeleteSubtask(taskId: string, subtaskId: string) {
    await deleteSubtaskFn({ id: taskId, subtaskId }).then(() => {
      toast.success("Subtask deletada com sucesso");
    });
  }

  return (
    <>
      {isLoading && <TaskDetailSkeleton />}
      {task !== undefined && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>{task.description}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Badge variant="secondary">{task.status}</Badge>
              <div className="flex items-center text-xs text-muted-foreground gap-1">
                <Calendar size={14} />
                {formatDate(task.createdAt)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-md font-bold">
                Subtasks ({task.subtasks.length || 0})
              </h3>
              {task.subtasks.length > 0 &&
                task.subtasks.map((sbt) => (
                  <div
                    key={sbt.id}
                    className="flex justify-between items-center gap-2 bg-zinc-400 dark:bg-zinc-600 rounded-md p-2 pl-4 pr-4"
                  >
                    <h4 className="text-sm font-bold truncate flex-1">
                      {sbt.title}
                    </h4>
                    <form {...changeStatusForm}>
                      <Controller
                        name="status"
                        control={changeStatusForm.control}
                        render={() => (
                          <Select
                            value={sbt.status}
                            onValueChange={(value: TaskStatus) =>
                              handleChangeStatus(sbt.id, task.id, value)
                            }
                          >
                            <SelectTrigger className="w-full min-w-45">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="PENDING">Pendente</SelectItem>
                              <SelectItem value="IN_PROGRESS">
                                Em andamento
                              </SelectItem>
                              <SelectItem value="FINISHED">
                                Concluído
                              </SelectItem>
                              <SelectItem value="CANCELLED">
                                Cancelada
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </form>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSubtask(task.id, sbt.id)}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
            </div>

            <form
              className="flex gap-2"
              onSubmit={handleSubmit(handleCreateSubtask)}
            >
              <FieldGroup>
                <Input
                  type="text"
                  placeholder="Título"
                  {...register("title")}
                />
              </FieldGroup>
              <Button type="submit" variant="outline">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      )}
    </>
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
