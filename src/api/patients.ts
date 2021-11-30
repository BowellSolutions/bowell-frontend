import AxiosClient from "./axiosClient";
import {Response, UserData} from "./types";

export const getPatients = (): Promise<Response<UserData[]>> => {
  return AxiosClient.get('/users/');  // to do api endpoint for patients or filter
};
