/**
 * @author: Adam Lisichin
 * @file: Exports authentication and user related functions performing HTTP calls with axiosClient
 **/
import axiosClient from "./axiosClient";
import type {Response} from "./types";
import {RegisterUserData, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

/**
 Sends POST request at /api/auth/token/
 **/
export const login = (email: string, password: string, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/', {
    email,
    password
  }, {...options});
};

/**
 Sends POST request at /api/users/
 **/
export const register = (data: RegisterUserData, options?: AxiosRequestConfig): Promise<Response<UserData>> => {
  return axiosClient.post('/users/', {...data}, {...options});
};

/**
 Sends GET request at /api/auth/token/
 **/
export const logout = (options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.get('/auth/logout/', {...options});
};

/**
 Sends POST request at /api/auth/token/refresh/
 **/
export const refreshToken = (options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return axiosClient.post('/auth/token/refresh/', {}, {...options});
};

/**
 Sends POST request at /api/auth/token/verify/
 **/
export const verifyToken = (token?: string, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  // token can either be send in body (as token) or cookies (as access)
  return axiosClient.post('/auth/token/verify/', token ? {token: token} : {}, {...options});
};

/**
 Sends GET request at /api/users/me/
 **/
export const getCurrentUser = (options?: AxiosRequestConfig): Promise<Response<UserData>> => {
  return axiosClient.get('/users/me/', {...options});
};
