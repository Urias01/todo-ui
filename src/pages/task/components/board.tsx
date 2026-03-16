import { TaskStatus } from "@/features/tasks/types/task-status";
import { Column } from "./column";
import { EmptyState } from "./empty-state";
import { TaskCard } from "./task-card";
import type { TaskResponse } from "@/features/tasks/types/task-response";

interface BoardProps {
  pending: TaskResponse[];
  inProgress: TaskResponse[];
  done: TaskResponse[];
  cancelled: TaskResponse[];
}

export function Board({ pending, inProgress, done, cancelled }: BoardProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-152 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Column status={TaskStatus.PENDING} count={pending.length}>
          {pending.length !== undefined && pending.length > 0 ? (
            pending.map((p) => (
              <TaskCard
                key={p.id}
                title={p.title}
                description={p.description}
                status={p.status}
                quantitySubtask={p.subtasks.length || 0}
                createdAt={new Date(p.createdAt)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Column>

        <Column status={TaskStatus.IN_PROGRESS} count={inProgress.length}>
          {inProgress.length !== undefined && inProgress.length > 0 ? (
            inProgress.map((ip) => (
              <TaskCard
                key={ip.id}
                title={ip.title}
                description={ip.description}
                status={ip.status}
                quantitySubtask={ip.subtasks.length || 0}
                createdAt={new Date(ip.createdAt)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Column>

        <Column status={TaskStatus.DONE} count={done.length}>
          {done.length !== undefined && done.length > 0 ? (
            done.map((d) => (
              <TaskCard
                key={d.id}
                title={d.title}
                description={d.description}
                status={d.status}
                quantitySubtask={d.subtasks.length || 0}
                createdAt={new Date(d.createdAt)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Column>

        <Column status={TaskStatus.CANCELLED} count={cancelled.length}>
          {cancelled.length !== undefined && cancelled.length > 0 ? (
            cancelled.map((c) => (
              <TaskCard
                key={c.id}
                title={c.title}
                description={c.description}
                status={c.status}
                quantitySubtask={c.subtasks.length || 0}
                createdAt={new Date(c.createdAt)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Column>
      </div>
    </div>
  );
}
