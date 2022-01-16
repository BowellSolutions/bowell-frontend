/*
* @author: Adam Lisichin
* @file: Exports user related functions performing HTTP calls with axiosClient
* Available functions:
* - getPatients
* - getDoctors
*/
import AxiosClient from "./axiosClient";
import {PaginatedResponse, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

export const getPatients = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=PATIENT', {...options});
};


export const getDoctors = (options?: AxiosRequestConfig): Promise<PaginatedResponse<UserData>> => {
  return AxiosClient.get('/users/?type=DOCTOR', {...options});
};
