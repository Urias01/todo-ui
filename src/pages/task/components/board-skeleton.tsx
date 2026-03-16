import { TaskStatus } from "@/features/tasks/types/task-status";
import { Column } from "./column";
import { TaskCardSkeleton } from "./task-card-skeleton";

export function BoardSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-152 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Column status={TaskStatus.PENDING} count={0}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.IN_PROGRESS} count={0}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.FINISHED} count={0}>
          <TaskCardSkeleton />
        </Column>

        <Column status={TaskStatus.CANCELLED} count={0}>
          <TaskCardSkeleton />
        </Column>
      </div>
    </div>
  );
}
