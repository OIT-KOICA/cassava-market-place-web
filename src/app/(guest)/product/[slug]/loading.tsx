import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Small Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-primary to-secondary py-8 pt-16 text-white">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-4 text-white" disabled>
            <ChevronLeft className="mr-2 size-4" />
            Back to Products
          </Button>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Skeleton className="size-24 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Skeleton className="mb-4 h-8 w-48" />
            <div className="space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="mr-2 h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>

            <Skeleton className="mb-2 mt-6 h-6 w-36" />
            <div className="rounded-md border p-4">
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="mb-4 h-8 w-48" />
            <Skeleton className="mb-4 aspect-video w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section Skeleton */}
        <div className="mt-12">
          <Skeleton className="mb-4 h-8 w-48" />
          <div className="rounded-lg bg-card p-4">
            <div className="mb-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      i % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <Skeleton className="mb-1 inline-block h-4 w-16" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="mt-1 inline-block h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="my-4 h-px w-full" />
            <div className="flex items-center">
              <Skeleton className="mr-2 h-20 grow rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
