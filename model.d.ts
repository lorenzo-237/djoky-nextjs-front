type Role = 'USER' | 'MANAGER' | 'ADMIN';
type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
};

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdUserId: number;
  isPending: boolean;
};

type CategoryResponse = {
  count: number;
  rows: Category[];
};
