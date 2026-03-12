import { CheckIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="antialised grid min-h-screen grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:flex h-full flex-col justify-between p-10 text-muted-foreground bg-linear-to-b from-indigo-500 dark:from-indigo-700 from-10% via-sky-500 dark:via-sky-700 via-30% to-emerald-500 dark:to-emerald-900 to-90%">
        <div className="flex items-center gap-3 text-lg  text-primary">
          <CheckIcon className="h-8 w-8" />
          <span className="font-semibold">Tasks</span>
        </div>
        <footer className="text-sm  text-foreground">
          &copy; task - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
}
