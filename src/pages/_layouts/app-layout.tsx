import { ModeToggle } from "@/components/mode-toggle";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <section className="flex h-min-screen">
      <div className="antialised flex-1 min-h-screen h-full flex-col">
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
        </div>
        <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
