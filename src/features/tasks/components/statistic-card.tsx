import { Card, CardContent } from "@/components/ui/card";

interface StatisticCardProps {
  title: string;
  num: number;
  icon: React.ReactNode;
  iconBg?: string;
}

export function StatisticCard({
  title,
  num,
  icon,
  iconBg = "bg-zinc-300"
}: StatisticCardProps) {
  return (
    <Card className="max-w-52 md:max-w-80">
      <CardContent className="flex items-center justify-start gap-4">
        <div
          className={`h-10 w-10 md:h-12 md:w-12 p-2 flex items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-2xl font-bold">{num}</h3>
          <p className="text-zinc-400">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
