import AxiosClient from "./axiosClient";
import {
  CreateExaminationData,
  ExaminationData,
  InferenceResults,
  PaginatedResponse,
  Response,
  UpdateExaminationData
} from "./types";
import {AxiosRequestConfig} from "axios";

export const getExaminations = (options?: AxiosRequestConfig): Promise<PaginatedResponse<ExaminationData>> => {
  return AxiosClient.get('/examinations/', {...options});
};

export const getExamination =
  (examinationID: number | string, options?: AxiosRequestConfig): Promise<Response<ExaminationData>> => {
    return AxiosClient.get(`/examinations/${examinationID}/`, {...options});
  };

export const createExamination =
  (data: CreateExaminationData, options?: AxiosRequestConfig): Promise<Response<ExaminationData>> => {
    return AxiosClient.post('/examinations/', {...data}, {...options});
  };

export const updateExamination =
  (
    examinationID: number | string,
    data: Omit<UpdateExaminationData, 'id'>,
    options?: AxiosRequestConfig
  ): Promise<Response<ExaminationData>> => {
    return AxiosClient.patch(`/examinations/${examinationID}/`, {...data}, {...options});
  };

export const startInference = (examinationID: number | string, options?: AxiosRequestConfig)
  : Promise<Response<{message: string}>> => {
  return AxiosClient.post(`/examinations/${examinationID}/inference/`, {}, {...options});
};

export const getInferenceState = (examinationID: number | string, options?: AxiosRequestConfig)
  : Promise<Response<InferenceResults>> => {
  return AxiosClient.get(`/examinations/${examinationID}/inference/`, {...options});
};
