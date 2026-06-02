'use client';

import Link from 'next/link';
import type { Event } from '@/src/lib/types/events';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  if (startDate.toDateString() === endDate.toDateString()) {
    return startDate.toLocaleDateString('en-US', opts);
  }
  return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('en-US', opts)}`;
}

function SeatsLabel({ remaining }: { remaining: number | null }) {
  if (remaining === null) {
    return (
      <span className="font-label-md text-label-md text-secondary">
        Unlimited Seats
      </span>
    );
  }
  if (remaining === 0) {
    return (
      <span className="font-label-md text-label-md px-sm py-xs bg-error/10 text-error rounded-full font-bold">
        Full
      </span>
    );
  }
  return (
    <span className="font-label-md text-label-md text-on-surface-variant">
      {remaining} seats left
    </span>
  );
}

export default function EventCard({ event }: { event: Event }) {
  const imageSrc = event.cover_image || PLACEHOLDER_IMAGE;

  return (
    <Link
      href={`/events/${event.id}`}
      className="clean-card rounded-2xl overflow-hidden flex flex-col group focus-visible:outline-2 focus-visible:outline-primary"
      aria-label={`View details for ${event.name}`}
    >
      {/* Cover image */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-sm right-sm flex gap-xs flex-wrap justify-end">
          {event.is_attending && (
            <span className="font-label-md text-label-md px-sm py-xs bg-secondary text-on-secondary rounded-full flex items-center gap-xs">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                verified
              </span>
              Registered
            </span>
          )}
          {event.remaining_seats === 0 && (
            <span className="font-label-md text-label-md px-sm py-xs bg-error text-on-error rounded-full">
              Full
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-sm p-lg flex-1">
        <h3 className="font-h3 text-h3 text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
          {event.name}
        </h3>

        <div className="flex items-center gap-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] shrink-0" aria-hidden="true">
            calendar_today
          </span>
          <span className="font-body-sm text-body-sm">
            {formatDateRange(event.start_date, event.end_date)}
          </span>
        </div>

        {event.venue_name && (
          <div className="flex items-center gap-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] shrink-0" aria-hidden="true">
              location_on
            </span>
            <span className="font-body-sm text-body-sm line-clamp-1">{event.venue_name}</span>
          </div>
        )}

        <div className="mt-auto pt-sm flex items-center justify-between border-t border-outline-variant">
          <SeatsLabel remaining={event.remaining_seats} />
          <span className="material-symbols-outlined text-primary text-[20px] transition-transform group-hover:translate-x-1" aria-hidden="true">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
