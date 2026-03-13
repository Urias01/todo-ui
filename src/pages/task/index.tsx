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

  const total = data?.length;

  const pending = data
    ?.filter((x) => x.status === TaskStatus.PENDING)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const inProgress = data
    ?.filter((x) => x.status === TaskStatus.IN_PROGRESS)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const finished = data
    ?.filter((x) => x.status === TaskStatus.DONE)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const cancelled = data
    ?.filter((x) => x.status === TaskStatus.CANCELLED)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

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
              num={total || 0}
              title="Total"
              iconBg="bg-zinc-300"
              icon={<ListTodoIcon className="text-zinc-700" />}
            />
            <StatisticCard
              num={pending?.length || 0}
              title="A Fazer"
              iconBg="bg-zinc-300"
              icon={<ClockIcon className="text-zinc-700" />}
            />
            <StatisticCard
              num={inProgress?.length || 0}
              title="Em Progresso"
              iconBg="bg-blue-200"
              icon={<LoaderCircleIcon className="text-blue-700" />}
            />
            <StatisticCard
              num={finished?.length || 0}
              title="Finalizada"
              iconBg="bg-green-200"
              icon={<CheckCircleIcon className="text-green-700" />}
            />
            <StatisticCard
              num={cancelled?.length || 0}
              title="Cancelada"
              iconBg="bg-red-200"
              icon={<XIcon className="text-red-700" />}
            />
          </>
        )}
      </header>
      <section className="space-y-4">
        {isLoadingTask && <BoardSkeleton />}
        {data?.length !== undefined && (
          <Board
            pending={pending || []}
            inProgress={inProgress || []}
            done={finished || []}
            cancelled={cancelled || []}
          />
        )}
      </section>
    </>
  );
}
