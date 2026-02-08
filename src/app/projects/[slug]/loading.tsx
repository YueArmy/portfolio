import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-4 w-32" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
