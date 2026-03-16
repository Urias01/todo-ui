import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskCardSkeleton() {
  return (
    <Card className="p-4 space-y-3 cursor-pointer hover:shadow-md transition bg-zinc-200 dark:bg-zinc-700">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-25" />

        <Skeleton className="h-5 w-35" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-2 w-15" />

        <Skeleton className="h-2 w-10" />
      </div>

      <div className="flex items-center text-xs text-muted-foreground gap-1">
        <Skeleton className="h-5 w-25" />
      </div>
    </Card>
  );
}
