import { Board } from "@/pages/task/components/board";
import { StatisticCard } from "@/pages/task/components/statistic-card";
import {
  CheckCircleIcon,
  ClockIcon,
  ListTodoIcon,
  LoaderCircleIcon,
  XIcon
} from "lucide-react";

export function Task() {
  return (
    <>
      <header className="grid grid-cols-2 md:grid-cols-5 gap-4 align-middle">
        <StatisticCard
          num={14}
          title="Total"
          iconBg="bg-zinc-300"
          icon={<ListTodoIcon className="text-zinc-700" />}
        />
        <StatisticCard
          num={2}
          title="A Fazer"
          iconBg="bg-zinc-300"
          icon={<ClockIcon className="text-zinc-700" />}
        />
        <StatisticCard
          num={4}
          title="Em Progresso"
          iconBg="bg-blue-200"
          icon={<LoaderCircleIcon className="text-blue-700" />}
        />
        <StatisticCard
          num={6}
          title="Finalizada"
          iconBg="bg-green-200"
          icon={<CheckCircleIcon className="text-green-700" />}
        />
        <StatisticCard
          num={2}
          title="Cancelada"
          iconBg="bg-red-200"
          icon={<XIcon className="text-red-700" />}
        />
      </header>
      <section className="space-y-4">
        <Board />
      </section>
    </>
  );
}
