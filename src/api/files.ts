import AxiosClient from "./axiosClient";
import {FileData, Response} from "./types";

export const getFiles = (): Promise<Response<FileData[]>> => {
  return AxiosClient.get('/recordings/');
};

export const getFile = (fileId: string): Promise<Response<FileData>> => {
  return AxiosClient.get(`/recordings/${fileId}/`);
};

export const deleteFile = (fileId: string): Promise<Response<{}>> => {
  return AxiosClient.delete(`/recordings/${fileId}`);
};

export const uploadFile =
  (data: FormData, progressHandler: (progressEvent: ProgressEvent) => void): Promise<Response<FileData>> => {
    return AxiosClient.post(
      '/recordings/',
      data,
      {onUploadProgress: progressHandler}
    );
  };
