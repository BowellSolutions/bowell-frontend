/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Gustaw Daczkowski, Hubert Decyusz, Wojciech Nowicki
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
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
 Sends GET request at /api/examinations/<query>
 */
export const getExaminationByQuery = (query: string, options?: AxiosRequestConfig): Promise<PaginatedResponse<ExaminationData>> => {
  return AxiosClient.get(`/examinations/${query}`, {...options});
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
