import AxiosClient from "./axiosClient";
import {Response, UserData} from "./types";
import {AxiosRequestConfig} from "axios";

export const getPatients = (options?: AxiosRequestConfig): Promise<Response<UserData[]>> => {
  return AxiosClient.get('/users/', {...options});  // to do api endpoint for patients or filter
};
