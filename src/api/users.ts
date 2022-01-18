/**
 * @author: Adam Lisichin
 * @file: Exports user related functions performing HTTP calls with axiosClient
 */
import AxiosClient from "./axiosClient";
import {PaginatedResponse, Response, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

/**
 * Sends GET request at /api/users/?type=PATIENT
 */
export const getPatients = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=PATIENT', {...options});
};


/**
 * Sends GET request at /api/users/?type=DOCTOR
 */
export const getDoctors = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=DOCTOR', {...options});
};


/**
 * Sends GET request at /api/users/[id]/
 */
export const getUserById = (userId: number | string, options?: AxiosRequestConfig)
  : Promise<Response<UserData>> => {
  return AxiosClient.get(`/users/${userId}/`, {...options});
};
