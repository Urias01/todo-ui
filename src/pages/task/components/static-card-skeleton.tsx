import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StaticCardSkeleton() {
  return (
    <Card className="max-w-52 md:max-w-80">
      <CardContent className="flex items-center justify-start gap-4">
        <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-xl" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-25" />
          <Skeleton className="h-5 w-30" />
        </div>
      </CardContent>
    </Card>
  );
}
