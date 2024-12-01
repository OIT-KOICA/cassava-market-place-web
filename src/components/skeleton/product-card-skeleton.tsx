import { memo } from "react";
import { Skeleton } from "../ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-md">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-6 w-2/3" />
          <div className="flex items-center">
            <Skeleton className="mr-2 size-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCardSkeleton);
