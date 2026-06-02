export default function EventCardSkeleton() {
  return (
    <div className="clean-card rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-surface-container" />
      <div className="p-lg flex flex-col gap-sm">
        <div className="h-6 bg-surface-container rounded w-4/5" />
        <div className="h-4 bg-surface-container rounded w-3/5" />
        <div className="h-4 bg-surface-container rounded w-2/5" />
        <div className="mt-auto pt-sm flex items-center justify-between border-t border-outline-variant">
          <div className="h-4 bg-surface-container rounded w-24" />
          <div className="h-5 w-5 bg-surface-container rounded" />
        </div>
      </div>
    </div>
  );
}
