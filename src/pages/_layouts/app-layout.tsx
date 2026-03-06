import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <section className="flex h-min-screen">
      <div className="antialised flex-1 min-h-screen h-full flex-col">
        <div className="ml-auto flex items-start justify-between p-4 space-x-2">
          <div>
            <h2 className="text-4xl font-bold">Minhas Tasks</h2>
            <p className="text-zinc-500">Olá, Autor name!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="default" className="w-28">
              <PlusIcon />
              Nova Task
            </Button>
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
