import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import { TaskForm } from "../task/components/form/task-form";
import { getCurrentUser } from "@/features/user/api/get-current-user";
import { useQuery } from "@tanstack/react-query";

export function AppLayout() {
  const token = localStorage.getItem("token");

  console.log(!!token);
  const { data } = useQuery({
    queryKey: ["loggeduser"],
    queryFn: getCurrentUser,
    enabled: !!token
  });

  return (
    <section className="flex h-min-screen">
      <div className="antialised flex-1 min-h-screen h-full flex-col">
        <div className="ml-auto flex items-start justify-between p-4 space-x-2">
          <div>
            <h2 className="text-4xl font-bold">Minhas Tasks</h2>
            <p className="text-zinc-500">Olá, {data?.name}!</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="flex gap-2">
                  <PlusCircle className="h-4 w-4" /> Tarefa
                </Button>
              </DialogTrigger>
              <TaskForm />
            </Dialog>
            <ModeToggle />
          </div>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
