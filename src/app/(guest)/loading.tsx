import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-background/80 shadow-md backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Skeleton className="h-8 w-32" />
          <div className="hidden space-x-6 md:flex">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full md:hidden" />
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="relative flex h-[80vh] items-center justify-center overflow-hidden pt-16">
        <Skeleton className="absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Skeleton className="mx-auto mb-6 h-12 w-3/4" />
          <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Skeleton className="h-12 w-full sm:w-64" />
            <Skeleton className="h-12 w-full sm:w-32" />
          </div>
        </div>
      </section>

      {/* Product Listing Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <Skeleton className="mx-auto mb-8 h-10 w-64" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg bg-card shadow-md"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-4 w-1/2" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-secondary">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-4 h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="mt-8 h-4 w-full pt-8" />
        </div>
      </footer>
    </div>
  );
}
