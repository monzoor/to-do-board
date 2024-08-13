// Define a default API response type
export interface APIResponse<T> {
  status: string;
  data: T;
}
