export interface UserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
