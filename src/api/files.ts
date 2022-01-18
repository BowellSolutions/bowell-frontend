/**
 * @author: Adam Lisichin
 * @file: Exports recordings related functions performing HTTP calls with axiosClient
 */
import AxiosClient from "./axiosClient";
import {FileData, PaginatedResponse, Response} from "./types";
import {AxiosRequestConfig} from "axios";

/**
 Sends GET request at /api/recordings/
 **/
export const getFiles = (options?: AxiosRequestConfig): Promise<PaginatedResponse<FileData>> => {
  return AxiosClient.get('/recordings/', {...options});
};

/**
 Sends GET request at /api/recordings/[id]/
 **/
export const getFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<FileData>> => {
  return AxiosClient.get(`/recordings/${fileId}/`, {...options});
};

/**
 Sends DELETE request at /api/recordings/[id]/
 **/
export const deleteFile = (fileId: string | number, options?: AxiosRequestConfig): Promise<Response<{}>> => {
  return AxiosClient.delete(`/recordings/${fileId}/`, {...options});
};

/**
 Sends POST request at /api/recordings/[id]/
 **/
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
