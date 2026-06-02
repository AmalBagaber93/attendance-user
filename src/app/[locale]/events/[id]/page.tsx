'use client';

import { use } from 'react';
import Link from 'next/link';
import { useEventDetailsQuery } from '@/src/lib/queries/events';
import EventDetailsView from '@/src/components/events/EventDetailsView';
import EventDetailsSkeleton from '@/src/components/events/EventDetailsSkeleton';

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const eventId = Number(id);

  const { data, isLoading, isError, refetch } = useEventDetailsQuery(eventId);

  return (
    <main className="min-h-screen">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-6 pt-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_back
          </span>
          Back to Events
        </Link>
      </div>

      {isLoading ? (
        <EventDetailsSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 gap-lg text-center max-w-4xl mx-auto px-6">
          <span
            className="material-symbols-outlined text-error"
            style={{ fontSize: 64 }}
            aria-hidden="true"
          >
            error_outline
          </span>
          <div>
            <p className="font-h3 text-h3 text-on-surface">Failed to load event</p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Something went wrong. Please try again.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-xs px-lg py-md bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              refresh
            </span>
            Try Again
          </button>
        </div>
      ) : data?.data ? (
        <EventDetailsView event={data.data} />
      ) : null}
    </main>
  );
}
