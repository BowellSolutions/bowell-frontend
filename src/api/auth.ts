import axiosClient from "./axiosClient";
import type {Response} from "./types";
import {RegisterUserData, UserData} from "./types";

export const login = (email: string, password: string): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/', {
    email,
    password
  });
};

export const register = (data: RegisterUserData): Promise<Response<UserData>> => {
  return axiosClient.post('/users/', {...data});
}

export const logout = (): Promise<Response<{}>> => axiosClient.get('/auth/logout/');

export const refreshToken = (): Promise<Response<{}>> => axiosClient.post('/auth/token/refresh/', {});

export const verifyToken = (): Promise<Response<{}>> => axiosClient.post('/auth/token/verify/', {});

export const getCurrentUser = (): Promise<Response<UserData>> => axiosClient.get('/users/me/');
