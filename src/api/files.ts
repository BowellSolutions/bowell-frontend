/*
* @author: Adam Lisichin
* @file: Exports recordings related functions performing HTTP calls with axiosClient
* Available functions:
* - getFiles
* - getFile
* - deleteFile
* - uploadFile
*/
import AxiosClient from "./axiosClient";
import {FileData, Response, PaginatedResponse} from "./types";
import {AxiosRequestConfig} from "axios";

export const getFiles = (options?: AxiosRequestConfig): Promise<PaginatedResponse<FileData>> => {
  return AxiosClient.get('/recordings/', {...options});
};

export const getFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<FileData>> => {
  return AxiosClient.get(`/recordings/${fileId}/`, {...options});
};

export const deleteFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return AxiosClient.delete(`/recordings/${fileId}/`, {...options});
};

export const uploadFile =
  (
    data: FormData,
    progressHandler: (progressEvent: ProgressEvent) => void,
    options?: AxiosRequestConfig
  ): Promise<Response<FileData>> => {
    return AxiosClient.post(
      '/recordings/',
      data,
      {onUploadProgress: progressHandler, ...options}
    );
  };
