import axiosClient from "./axiosClient";
import {UserData} from "./types";

export const login = (username: string, password: string): Promise<any> => {
  return axiosClient.post('/auth/token/', {
    username,
    password
  });
};

export const logout = (): Promise<{}> => axiosClient.get('/auth/logout/');

export const refreshToken = (): Promise<unknown> => axiosClient.post('/auth/token/refresh/', {});

export const verifyToken = (): Promise<{}> => axiosClient.post('/auth/token/verify/', {});

export const getCurrentUser = (): Promise<UserData> => axiosClient.get('/users/me/');
