import AxiosClient from "./axiosClient";
import type {Response} from "./types";
import {AxiosRequestConfig} from "axios";
import {DoctorStatisticsData} from "./types";

export const getDoctorStatistics = (options?: AxiosRequestConfig): Promise<Response<DoctorStatisticsData>> => {
  return AxiosClient.get('/statistics/', {...options});
}
