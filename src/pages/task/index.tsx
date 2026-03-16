import { getTasks } from "@/features/tasks/api/get-tasks";
import { TaskStatus } from "@/features/tasks/types/task-status";
import { Board } from "@/pages/task/components/board";
import { StatisticCard } from "@/pages/task/components/statistic-card";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircleIcon,
  ClockIcon,
  ListTodoIcon,
  LoaderCircleIcon,
  XIcon
} from "lucide-react";
import { StaticCardSkeleton } from "./components/static-card-skeleton";
import { BoardSkeleton } from "./components/board-skeleton";

export function Task() {
  const { data, isLoading: isLoadingTask } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks
  });

  const tasks = data ?? [];

  const pending = tasks.filter((x) => x.status === TaskStatus.PENDING);
  const inProgress = tasks.filter((x) => x.status === TaskStatus.IN_PROGRESS);
  const finished = tasks.filter((x) => x.status === TaskStatus.FINISHED);
  const cancelled = tasks.filter((x) => x.status === TaskStatus.CANCELLED);

  return (
    <>
      <header className="grid grid-cols-2 md:grid-cols-5 gap-4 align-middle">
        {isLoadingTask && (
          <>
            <StaticCardSkeleton />
            <StaticCardSkeleton />
            <StaticCardSkeleton />
            <StaticCardSkeleton />
            <StaticCardSkeleton />
          </>
        )}
        {data?.length !== undefined && (
          <>
            <StatisticCard
              num={tasks.length}
              title="Total"
              iconBg="bg-zinc-300"
              icon={<ListTodoIcon className="text-zinc-700" />}
            />
            <StatisticCard
              num={pending.length}
              title="A Fazer"
              iconBg="bg-zinc-300"
              icon={<ClockIcon className="text-zinc-700" />}
            />
            <StatisticCard
              num={inProgress.length}
              title="Em Progresso"
              iconBg="bg-blue-200"
              icon={<LoaderCircleIcon className="text-blue-700" />}
            />
            <StatisticCard
              num={finished.length}
              title="Finalizada"
              iconBg="bg-green-200"
              icon={<CheckCircleIcon className="text-green-700" />}
            />
            <StatisticCard
              num={cancelled.length}
              title="Cancelada"
              iconBg="bg-red-200"
              icon={<XIcon className="text-red-700" />}
            />
          </>
        )}
      </header>
      <section className="space-y-4">
        {isLoadingTask && <BoardSkeleton />}
        {data?.length !== undefined && <Board tasks={tasks} />}
      </section>
    </>
  );
}
