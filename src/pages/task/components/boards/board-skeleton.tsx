import { TaskStatus } from "@/features/tasks/types/task-status";
import { Column } from "./column";
import { TaskCardSkeleton } from "./task-card-skeleton";

export function BoardSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-152 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Column status={TaskStatus.PENDING} tasks={[]}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.IN_PROGRESS} tasks={[]}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.FINISHED} tasks={[]}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.CANCELLED} tasks={[]}>
          <TaskCardSkeleton />
        </Column>
      </div>
    </div>
  );
}
