export interface IPaginatedResult<T> {
  page: number;
  limit: number;
  is_last_page: Boolean;
  data: T[];
}
