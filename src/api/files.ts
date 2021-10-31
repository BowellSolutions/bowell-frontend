import AxiosClient from "./axiosClient";

export const getFiles = (): Promise<any> => {
  return AxiosClient.get('/files/');
};

export const uploadFile =
  (data: FormData, callback: (progressEvent: ProgressEvent) => void): Promise<any> => {
  return AxiosClient.put(
    '/files/upload',
    data,
    {onUploadProgress: callback}
  );
};
