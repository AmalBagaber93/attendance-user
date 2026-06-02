'use client';

import { useState, useCallback } from 'react';
import { useEventsQuery } from '@/src/lib/queries/events';
import type { SortField, SortDirection } from '@/src/lib/types/events';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';
import EventsEmptyState from './EventsEmptyState';
import EventsErrorState from './EventsErrorState';

const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'start_date', label: 'Start Date' },
  { value: 'end_date', label: 'End Date' },
  { value: 'name', label: 'Name' },
  { value: 'created_at', label: 'Created At' },
];

export default function EventsSection() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('start_date');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);

  const debounceRef = useCallback(
    (() => {
      let t: ReturnType<typeof setTimeout>;
      return (val: string) => {
        clearTimeout(t);
        t = setTimeout(() => setDebouncedSearch(val), 400);
      };
    })(),
    []
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
    debounceRef(val);
  };

  const handleSortBy = (val: SortField) => {
    setSortBy(val);
    setPage(1);
  };

  const handleSortDir = (val: SortDirection) => {
    setSortDir(val);
    setPage(1);
  };

  const { data, isLoading, isError, refetch } = useEventsQuery({
    search: debouncedSearch || undefined,
    sort_by: sortBy,
    sort_direction: sortDir,
    page,
    per_page: 12,
  });

  console.log(data)
  const pagination = data?.meta?.pagination;
  const events = data?.data ?? [];

  return (
    <section aria-labelledby="events-heading" className="py-section px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-xl">
          <h2 id="events-heading" className="font-h1 text-h1 text-on-surface mb-xs">
            Upcoming Events
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Discover and register for events happening near you.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-md mb-xl">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span
              className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search events…"
              aria-label="Search events"
              className="w-full pl-xl pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Sort by */}
          <div className="flex items-center gap-sm shrink-0">
            <label htmlFor="sort-by" className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleSortBy(e.target.value as SortField)}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-sm py-sm font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Direction toggle */}
            <button
              onClick={() => handleSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
              aria-label={`Sort ${sortDir === 'asc' ? 'descending' : 'ascending'}`}
              className="flex items-center justify-center w-10 h-10 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
              </span>
            </button>
          </div>
        </div>

        {/* Grid */}
        {isError ? (
          <EventsErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <EventsEmptyState search={debouncedSearch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.total_pages > 1 && (
          <div className="flex items-center justify-center gap-sm mt-xl" aria-label="Pagination">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!pagination.prev_page}
              className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                chevron_left
              </span>
              Prev
            </button>

            <span className="font-label-md text-label-md text-on-surface-variant px-md">
              Page {pagination.current_page} of {pagination.total_pages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.next_page}
              className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              Next
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                chevron_right
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
