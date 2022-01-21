/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
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
