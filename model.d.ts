type Role = 'USER' | 'MANAGER' | 'ADMIN';
type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
};
