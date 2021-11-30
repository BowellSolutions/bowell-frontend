import AxiosClient from "./axiosClient";
import {ExaminationData, Response} from "./types";

export const getExaminations = (): Promise<Response<ExaminationData[]>> => {
  return AxiosClient.get('/examinations/');
};

export const createExamination = (data: any): Promise<Response<any>> => {
  return AxiosClient.post('/examinations/', {...data});
};

export const updateExamination = (examinationID: number | string, data: any): Promise<Response<ExaminationData>> => {
  return AxiosClient.patch(`/examinations/${examinationID}/`, {...data});
};


