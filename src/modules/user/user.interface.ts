export type TUser = {
  name: string;
  phone: string;
  role: 'super-admin' | 'admin' | 'manager' | 'user';
  password: string;
};
