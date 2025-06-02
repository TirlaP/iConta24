import { Skeleton } from "./skeleton";

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="container mx-auto px-4 space-y-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="py-12">
            <div className="text-center mb-12">
              <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
              <Skeleton className="h-5 w-1/2 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((j) => (
                <div key={j} className="p-6 border rounded-lg">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <Skeleton className="h-12 w-2/3 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <Skeleton className="h-12 w-48 mx-auto" />
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
          <Skeleton className="h-5 w-1/2 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <div className="flex gap-2 justify-center">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-5 w-full mb-8" />
            
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-1/3 mb-2" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-5 w-1/2 mb-6" />
            
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 rounded-full mt-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}