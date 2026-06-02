export default function EventsEmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-lg text-center">
      <span
        className="material-symbols-outlined text-on-surface-variant"
        style={{ fontSize: 64 }}
        aria-hidden="true"
      >
        event_busy
      </span>
      <div>
        <p className="font-h3 text-h3 text-on-surface">
          {search ? 'No events found' : 'No events yet'}
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          {search
            ? `No events match "${search}". Try a different search term.`
            : 'Check back soon for upcoming events.'}
        </p>
      </div>
    </div>
  );
}
