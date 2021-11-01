import AxiosClient from "./axiosClient";

export const getFiles = (): Promise<unknown> => {
  return AxiosClient.get('/files/');
};

export const uploadFile =
  (data: FormData, progressHandler: (progressEvent: ProgressEvent) => void): Promise<unknown> => {
    return AxiosClient.put(
      '/files/upload',
      data,
      {onUploadProgress: progressHandler}
    );
  };
