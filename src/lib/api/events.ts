'use client';

import { clientSharedFetch } from '@/src/lib/fetch/client';
import type {
  EventsQueryParams,
  EventsResponse,
  EventDetailsResponse,
} from '@/src/lib/types/events';

export async function fetchEvents(
  params: EventsQueryParams = {}
): Promise<EventsResponse> {
  const searchParams: Record<string, string> = {};

  if (params.search) searchParams.search = params.search;
  if (params.sort_by) searchParams.sort_by = params.sort_by;
  if (params.sort_direction) searchParams.sort_direction = params.sort_direction;
  if (params.page != null) searchParams.page = String(params.page);
  if (params.per_page != null) searchParams.per_page = String(params.per_page);

  return clientSharedFetch
    .get('events', { searchParams })
    .json<EventsResponse>();
}

export async function fetchEventDetails(id: number): Promise<EventDetailsResponse> {
  return clientSharedFetch.get(`events/${id}`).json<EventDetailsResponse>();
}
