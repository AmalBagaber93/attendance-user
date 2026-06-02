export default function EventDetailsSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-6 py-section space-y-xl">
      <div className="h-64 bg-surface-container rounded-2xl" />
      <div className="space-y-md">
        <div className="h-8 bg-surface-container rounded w-2/3" />
        <div className="h-4 bg-surface-container rounded w-full" />
        <div className="h-4 bg-surface-container rounded w-5/6" />
        <div className="h-4 bg-surface-container rounded w-4/6" />
      </div>
      <div className="grid grid-cols-2 gap-md">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-surface-container rounded-xl" />
        ))}
      </div>
      <div className="h-40 bg-surface-container rounded-xl" />
    </div>
  );
}
