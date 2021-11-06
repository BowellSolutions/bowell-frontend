import axiosClient from "./axiosClient";
import {UserData} from "./types";
import {AxiosResponse} from "axios";

type Response<T> = AxiosResponse<T>;

export const login = (username: string, password: string): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/', {
    username,
    password
  });
};

export const logout = (): Promise<Response<{}>> => axiosClient.get('/auth/logout/');

export const refreshToken = (): Promise<Response<{}>> => axiosClient.post('/auth/token/refresh/', {});

export const verifyToken = (): Promise<Response<{}>> => axiosClient.post('/auth/token/verify/', {});

export const getCurrentUser = (): Promise<Response<UserData>> => axiosClient.get('/users/me/');
