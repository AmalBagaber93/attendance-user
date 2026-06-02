export default function EventsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-lg text-center">
      <span
        className="material-symbols-outlined text-error"
        style={{ fontSize: 64 }}
        aria-hidden="true"
      >
        error_outline
      </span>
      <div>
        <p className="font-h3 text-h3 text-on-surface">Failed to load events</p>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Something went wrong. Please try again.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-xs px-lg py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          refresh
        </span>
        Try Again
      </button>
    </div>
  );
}
