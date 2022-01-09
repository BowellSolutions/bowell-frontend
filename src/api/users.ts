import AxiosClient from "./axiosClient";
import {PaginatedResponse, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

export const getPatients = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=PATIENT', {...options});  // to do api endpoint for patients or filter
};


export const getDoctors = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=DOCTOR', {...options});  // to do api endpoint for patients or filter
};
