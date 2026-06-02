export interface EventSpeaker {
  id: number;
  name: string;
  title: string;
  photo: string | null;
}

export interface EventSlot {
  id: number;
  name: string;
  type_description: string;
  start_date: string;
  end_date: string;
  capacity: number | null;
  remaining_seats: number | null;
  is_joined: boolean;
}

export interface MyAttendance {
  id: number;
  qr_code_value: string;
}

export interface Event {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  start_date: string;
  end_date: string;
  venue_name: string | null;
  venue_address: string | null;
  remaining_seats: number | null;
  is_attending: boolean;
}

export interface EventDetails extends Event {
  speakers: EventSpeaker[];
  slots: EventSlot[];
  my_attendance: MyAttendance | null;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
  total_count: number;
  per_page: number;
}

export interface PaginatedMeta {
  pagination: Pagination;
}

export interface EventsResponse {
  data: Event[];
  meta: PaginatedMeta;
}

export interface EventDetailsResponse {
  data: EventDetails;
}

export type SortField = 'name' | 'start_date' | 'end_date' | 'created_at';
export type SortDirection = 'asc' | 'desc';

export interface EventsQueryParams {
  search?: string;
  sort_by?: SortField;
  sort_direction?: SortDirection;
  page?: number;
  per_page?: number;
}
