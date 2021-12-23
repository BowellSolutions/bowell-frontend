import AxiosClient from "./axiosClient";
import {CreateExaminationData, ExaminationData, Response, UpdateExaminationData} from "./types";

export const getExaminations = (): Promise<Response<ExaminationData[]>> => {
  return AxiosClient.get('/examinations/');
};

export const getExamination = (examinationID: number | string): Promise<Response<ExaminationData>> => {
  return AxiosClient.get(`/examinations/${examinationID}/`);
};

export const createExamination = (data: CreateExaminationData): Promise<Response<ExaminationData>> => {
  return AxiosClient.post('/examinations/', {...data});
};

export const updateExamination =
  (examinationID: number | string, data: Omit<UpdateExaminationData, 'id'>): Promise<Response<ExaminationData>> => {
    return AxiosClient.patch(`/examinations/${examinationID}/`, {...data});
  };


