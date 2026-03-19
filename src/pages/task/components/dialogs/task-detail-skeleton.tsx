import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export function TaskDetailSkeleton() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          <Skeleton className="h-5 w-30" />
        </DialogTitle>
        <DialogDescription>
          <Skeleton className="h-5 w-35" />
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Badge variant="secondary">
            <Skeleton className="h-3 w-20" />
          </Badge>
        </div>

        <div className="flex items-center text-xs text-muted-foreground gap-1">
          <Calendar size={14} />
          <Skeleton className="h-3 w-25" />
        </div>
      </div>
    </DialogContent>
  );
}
