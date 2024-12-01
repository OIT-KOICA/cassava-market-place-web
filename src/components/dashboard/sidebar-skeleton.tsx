import React, { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="flex h-screen w-64 flex-col space-y-4 bg-gray-100 p-4 dark:bg-gray-900">
      {/* Header Skeleton */}
      <Skeleton className="mb-4 h-8 w-3/4" />

      {/* Liste d'éléments Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-full" />
      </div>

      {/* Footer Skeleton */}
      <div className="mt-auto">
        <Skeleton className="h-10 w-4/5" />
      </div>
    </div>
  );
};

export default memo(SidebarSkeleton);
