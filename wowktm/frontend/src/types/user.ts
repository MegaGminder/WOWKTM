export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  shopName?: string;
  isSeller: boolean;
  createdAt: string;
}
