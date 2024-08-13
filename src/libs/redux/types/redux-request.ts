export interface ReduxRequest<T> {
  requested: boolean;
  data: T;
  errorOccurred?: boolean;
  error?: string | null;
}
