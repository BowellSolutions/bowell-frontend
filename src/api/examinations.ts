/**
 * @author: Adam Lisichin
 * @file: Exports examination related functions performing HTTP calls with axiosClient
 */
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

/**
 Sends GET request at /api/examinations/
 */
export const getExaminations = (options?: AxiosRequestConfig): Promise<PaginatedResponse<ExaminationData>> => {
  return AxiosClient.get('/examinations/', {...options});
};

/**
 Sends GET request at /api/examinations/[id]/
 */
export const getExamination =
  (examinationID: number | string, options?: AxiosRequestConfig): Promise<Response<ExaminationData>> => {
    return AxiosClient.get(`/examinations/${examinationID}/`, {...options});
  };

/**
 Sends POST request at /api/examinations/[id]/
 **/
export const createExamination =
  (data: CreateExaminationData, options?: AxiosRequestConfig): Promise<Response<ExaminationData>> => {
    return AxiosClient.post('/examinations/', {...data}, {...options});
  };

/**
 Sends PATCH request at /api/examinations/[id]/
 */
export const updateExamination =
  (
    examinationID: number | string,
    data: Omit<UpdateExaminationData, 'id'>,
    options?: AxiosRequestConfig
  ): Promise<Response<ExaminationData>> => {
    return AxiosClient.patch(`/examinations/${examinationID}/`, {...data}, {...options});
  };

/**
 Sends POST request at /api/examinations/[id]/inference/
 */
export const startInference = (examinationID: number | string, options?: AxiosRequestConfig)
  : Promise<Response<{ message: string }>> => {
  return AxiosClient.post(`/examinations/${examinationID}/inference/`, {}, {...options});
};

/**
 Sends GET request at /api/examinations/[id]/inference/
 */
export const getInferenceState = (examinationID: number | string, options?: AxiosRequestConfig)
  : Promise<Response<InferenceResults>> => {
  return AxiosClient.get(`/examinations/${examinationID}/inference/`, {...options});
};
