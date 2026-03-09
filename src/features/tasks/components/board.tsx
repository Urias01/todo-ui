import { Column } from "./column";
import { EmptyState } from "./empty-state";
import { TaskCard } from "./task-card";

export function Board() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-152 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Column status="todo" count={1}>
          <TaskCard
            title="X"
            description={"description"}
            status={"PENDING"}
            quantitySubtask={0}
            createdAt={new Date()}
          />
        </Column>

        <Column status="in_progress" count={0}>
          <EmptyState />
        </Column>

        <Column status="done" count={1}>
          <TaskCard
            title={"Y"}
            description={"description"}
            status={"DONE"}
            quantitySubtask={0}
            createdAt={new Date()}
          />
        </Column>

        <Column status="canceled" count={0}>
          <EmptyState />
        </Column>
      </div>
    </div>
  );
}
