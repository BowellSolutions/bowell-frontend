/**
 * @author: Adam Lisichin
 * @file: Exports getDoctorStatistics function
 */
import AxiosClient from "./axiosClient";
import type {Response} from "./types";
import {AxiosRequestConfig} from "axios";
import {DoctorStatisticsData} from "./types";

/**
 * Sends GET request at /api/statistics/
 */
export const getDoctorStatistics = (options?: AxiosRequestConfig): Promise<Response<DoctorStatisticsData>> => {
  return AxiosClient.get('/statistics/', {...options});
};
