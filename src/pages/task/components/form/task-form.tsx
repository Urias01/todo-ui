import { TaskStatus } from "@/features/tasks/types/task-status";
import { z } from "zod";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/features/tasks/api/create-task";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const taskSchema = z.object({
  title: z.string().min(1, "Título não pode ser nulo"),
  description: z.string(),
  status: z.enum(TaskStatus),
  userIds: z.array(z.string())
});

type TaskSchema = z.infer<typeof taskSchema>;

const taskDefault: TaskSchema = {
  title: "",
  description: "",
  status: TaskStatus.PENDING,
  userIds: []
};

export function TaskForm() {
  const form = useForm<TaskSchema>({
    defaultValues: taskDefault,
    resolver: zodResolver(taskSchema)
  });

  const { register, handleSubmit, reset } = form;

  const { mutateAsync: createTaskFn } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"]
      });
    }
  });

  async function handleSubmitTask(data: TaskSchema) {
    await createTaskFn(data)
      .then(() => {
        toast.success("Task criada com sucesso");
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Ocorreu um erro desconhecido");
        }
      });

    reset();
  }

  return (
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Criar nova tarefa</DialogTitle>
        <DialogDescription>Crie uma nova tarefa.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitTask)}
          className="grid gap-4 py-4"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Título</FieldLabel>
              <Input
                id="title"
                placeholder="Título"
                autoComplete="off"
                {...register("title")}
              />
              <FieldDescription>Título da sua tarefa</FieldDescription>
              {form.formState.errors.title && (
                <FieldError errors={[form.formState.errors.title]} />
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>

              <Textarea id="description" {...form.register("description")} />

              {form.formState.errors.description && (
                <FieldError errors={[form.formState.errors.description]} />
              )}
            </Field>
            <Controller
              name="status"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="PENDING">Pendente</SelectItem>
                    <SelectItem value="IN_PROGRESS">Em andamento</SelectItem>
                    <SelectItem value="DONE">Concluído</SelectItem>
                    <SelectItem value="CANCELLED">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FieldGroup>
          <Separator className="w-full" />
          <DialogFooter>
            <Button type="submit">Criar tarefa</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
