export interface UserData {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  last_login: Date,
  is_active: boolean,
  is_staff: boolean,
  is_superuser: boolean,
  date_joined: Date,
  groups: any[],
  user_permissions: any[],
}
