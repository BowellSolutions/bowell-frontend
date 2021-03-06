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
 * @file: Exports Typescript types and interfaces which are used globally for typing
 */
import {AxiosResponse} from "axios";
import {Action} from "redux";
import {RootState} from "../redux/reducers";

export type Response<T> = AxiosResponse<T>;

export type PaginatedResponseData<T> = {
  count: number;
  previous: string | null,
  next: string | null,
  results: T[]
}

export type PaginatedResponse<T> = Response<PaginatedResponseData<T>>

export interface UserData {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  last_login: Date,
  is_active: boolean,
  is_staff: boolean,
  is_superuser: boolean,
  type: string, // DOCTOR | PATIENT | STAFF
  birth_date: Date | null,
  date_joined: Date,
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface RegisterUserData {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  type: string, // DOCTOR | PATIENT
  birth_date: string | null, // null is here just to match register form's birthDate field type
}

export interface ProbabilityPlotData {
  start: number | string,
  probability: number | string,
}

export interface FileData {
  id: number,
  file: string,
  name: string,
  uploaded_at: Date,
  latest_analysis_date?: Date,
  // examination
  examination: ExaminationData | null,
  // main results
  length?: number,
  bowell_sounds_number?: number,
  bowell_sounds_per_minute?: number,
  // frequency analysis in three-minute periods
  mean_per_minute?: number,
  deviation_per_minute?: number,
  median_per_minute?: number,
  first_quartile_per_minute?: number,
  third_quartile_per_minute?: number,
  first_decile_per_minute?: number,
  ninth_decile_per_minute?: number,
  minimum_per_minute?: number,
  maximum_per_minute?: number,
  repetition_within_50ms?: number,
  repetition_within_100ms?: number,
  repetition_within_200ms?: number,
  containing_30s_periods_percentage?: number,
  // Duration analysis, individual bowel sounds
  mean?: number,
  deviation?: number,
  median?: number,
  first_quartile?: number,
  third_quartile?: number,
  first_decile?: number,
  ninth_decile?: number,
  minimum?: number,
  maximum?: number,
  rmssd?: number,
  rmssd_logarithm?: number,
  sdnn?: number,
  porta_index?: number,
  guzik_index?: number,
  high_frequency_power?: number,
  medium_frequency_power?: number,
  low_frequency_power?: number,
  // Sound analysis total?: number,
  total_sound_index?: number,
  total_sound_duration?: number,
  // sound analysis per three minute periods?: number,
  total_sound_index_per_3minutes?: number,
  total_sound_duration_per_3minutes?: number,
  // technical details
  similarity_to_training_set?: number,

  // raw model output
  probability_plot: ProbabilityPlotData[] | null
}

export interface InferenceResults {
  task_id: string | number,
  status: string,
  result?: FileData,
}

export interface UserInfo {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
}

export interface RecordingInExamination {
  id: number,
  file: string,
  name: string,
}

type ExaminationStatus =
  "cancelled"
  | "scheduled"
  | "completed"
  | "file_uploaded"
  | "file_processing"
  | "processing_failed"
  | "processing_succeeded";

export interface ExaminationData {
  id: number,
  patient: UserInfo,
  doctor: UserInfo,
  height_cm?: number,
  mass_kg?: number,
  symptoms?: string,
  medication?: string,
  status?: ExaminationStatus,
  recording: RecordingInExamination | null,
  date: Date | string,
  overview?: string,
  analysis_id?: string,
}

export interface CreateExaminationData {
  doctor: number,
  patient: number,
  date: Date | string,
}

export interface UpdateExaminationData {
  id: number,
  height_cm?: number,
  mass_kg?: number,
  symptoms?: string,
  medication?: string,
  status?: ExaminationStatus,
  recording?: number | null | FileData,
  date?: Date | string,
  overview?: string,
}

export interface DoctorStatisticsData {
  examination_count: number,
  patients_related_count: number,
  examinations_scheduled_count: number,
  examinations_next_week_count: number,
}


export interface HydrateAction extends Action<"__NEXT_REDUX_WRAPPER_HYDRATE__"> {
  payload: RootState;
}
