import axiosClient from "./axiosClient";
import type {Response} from "./types";
import {RegisterUserData, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

export const login = (email: string, password: string, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/', {
    email,
    password
  }, {...options});
};

export const register = (data: RegisterUserData, options?: AxiosRequestConfig): Promise<Response<UserData>> => {
  return axiosClient.post('/users/', {...data}, {...options});
};

export const logout = (options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.get('/auth/logout/', {...options});
};

export const refreshToken = (options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/refresh/', {}, {...options});
};

export const verifyToken = (options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/verify/', {}, {...options});
};

export const getCurrentUser = (options?: AxiosRequestConfig): Promise<Response<UserData>> => {
  return axiosClient.get('/users/me/', {...options});
};
