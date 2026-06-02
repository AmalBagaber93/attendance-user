'use client';

import QRCode from 'react-qr-code';
import type { EventDetails } from '@/src/lib/types/events';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=60';

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  if (s.toDateString() === e.toDateString()) return s.toLocaleDateString('en-US', opts);
  return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', opts)}`;
}

export default function EventDetailsView({ event }: { event: EventDetails }) {
  const imageSrc = event.cover_image || PLACEHOLDER_IMAGE;

  return (
    <article className="max-w-4xl mx-auto px-6 py-section space-y-xl">
      {/* Header image */}
      <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={event.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
        {event.is_attending && (
          <span className="absolute top-md right-md font-label-md text-label-md px-sm py-xs bg-secondary text-on-secondary rounded-full flex items-center gap-xs">
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
      </div>

      {/* Title & description */}
      <div className="space-y-md">
        <h1 className="font-h1 text-h1 text-on-surface">{event.name}</h1>
        {event.description && (
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <InfoCard icon="calendar_today" label="Date">
          {formatDateRange(event.start_date, event.end_date)}
        </InfoCard>

        {event.venue_name && (
          <InfoCard icon="location_on" label="Venue">
            <span className="font-h3 text-h3 text-on-surface">{event.venue_name}</span>
            {event.venue_address && (
              <span className="font-body-sm text-body-sm text-on-surface-variant block mt-xs">
                {event.venue_address}
              </span>
            )}
          </InfoCard>
        )}

        <InfoCard icon="event_seat" label="Availability">
          {event.remaining_seats === null
            ? 'Unlimited Seats'
            : event.remaining_seats === 0
            ? <span className="text-error">Fully Booked</span>
            : `${event.remaining_seats} seats remaining`}
        </InfoCard>
      </div>

      {/* Speakers */}
      {event.speakers.length > 0 && (
        <section aria-labelledby="speakers-heading">
          <h2 id="speakers-heading" className="font-h2 text-h2 text-on-surface mb-lg">
            Speakers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-lg">
            {event.speakers.map((speaker) => (
              <div key={speaker.id} className="flex flex-col items-center text-center gap-sm">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-high shrink-0">
                  {speaker.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[32px]" aria-hidden="true">
                        person
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">{speaker.name}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{speaker.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sessions & Slots */}
      {event.slots.length > 0 && (
        <section aria-labelledby="slots-heading">
          <h2 id="slots-heading" className="font-h2 text-h2 text-on-surface mb-lg">
            Sessions
          </h2>
          <div className="space-y-md">
            {event.slots.map((slot) => (
              <div
                key={slot.id}
                className="clean-card rounded-xl p-lg flex flex-col sm:flex-row sm:items-start gap-md"
              >
                <div className="flex-1 space-y-xs">
                  <div className="flex items-center gap-sm flex-wrap">
                    <h3 className="font-h3 text-h3 text-on-surface">{slot.name}</h3>
                    {slot.is_joined && (
                      <span className="font-label-md text-label-md px-sm py-xs bg-secondary/10 text-secondary rounded-full">
                        Joined
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {slot.type_description}
                  </p>
                  <div className="flex flex-wrap gap-md pt-xs">
                    <span className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">schedule</span>
                      {formatDateTime(slot.start_date)}
                    </span>
                    <span className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">schedule</span>
                      {formatDateTime(slot.end_date)}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right space-y-xs">
                  {slot.capacity !== null && (
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Capacity: {slot.capacity}
                    </p>
                  )}
                  {slot.remaining_seats === null ? (
                    <p className="font-label-md text-label-md text-secondary">Unlimited</p>
                  ) : slot.remaining_seats === 0 ? (
                    <p className="font-label-md text-label-md text-error">Full</p>
                  ) : (
                    <p className="font-label-md text-label-md text-on-surface-variant">
                      {slot.remaining_seats} left
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Attendance */}
      {event.is_attending && event.my_attendance && (
        <section
          aria-labelledby="attendance-heading"
          className="bg-surface-container-low border border-outline-variant rounded-2xl p-lg"
        >
          <h2 id="attendance-heading" className="font-h2 text-h2 text-on-surface mb-lg">
            Your Attendance
          </h2>
          <div className="flex flex-col sm:flex-row gap-xl items-start sm:items-center">
            <div className="space-y-sm">
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Attendance ID</p>
                <p className="font-h3 text-h3 text-on-surface">#{event.my_attendance.id}</p>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">QR Code Value</p>
                <p className="font-body-sm text-body-sm text-on-surface font-mono break-all">
                  {event.my_attendance.qr_code_value}
                </p>
              </div>
            </div>
            <div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm shrink-0">
              <QRCode
                value={event.my_attendance.qr_code_value}
                size={140}
                aria-label="Attendance QR Code"
              />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-md bg-surface-container-low border border-outline-variant rounded-xl p-md">
      <div className="bg-surface-container-highest p-sm rounded-lg text-primary shrink-0">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant">{label}</p>
        <div className="font-h3 text-h3 text-on-surface">{children}</div>
      </div>
    </div>
  );
}
