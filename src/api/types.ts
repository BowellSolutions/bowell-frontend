import {AxiosResponse} from "axios";

export type Response<T> = AxiosResponse<T>;

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

export interface FileData {
  id: number,
  file: string,
  name: string,
  uploaded_at: number | string | UserData,  // to be decided
}
