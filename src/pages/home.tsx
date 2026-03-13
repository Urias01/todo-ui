import { Task } from "./task";

export function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col gap-12">
      <Task />
    </section>
  );
}
