'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchEventDetails } from '@/src/lib/api/events';
import type { EventsQueryParams } from '@/src/lib/types/events';

export const eventsKeys = {
  all: ['events'] as const,
  list: (params: EventsQueryParams) => ['events', 'list', params] as const,
  detail: (id: number) => ['events', 'detail', id] as const,
};

export function useEventsQuery(params: EventsQueryParams = {}) {
  return useQuery({
    queryKey: eventsKeys.list(params),
    queryFn: () => fetchEvents(params),
  });
}

export function useEventDetailsQuery(id: number) {
  return useQuery({
    queryKey: eventsKeys.detail(id),
    queryFn: () => fetchEventDetails(id),
    enabled: Boolean(id),
  });
}
