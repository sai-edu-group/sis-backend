export interface ApiResponseData<T = any> {
  status: boolean;
  statusCode: number;
  data: T | null;
  message: string;
  error: any | null;
}

export interface PaginatedData<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
