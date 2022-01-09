import {AppState} from "../store";
import {
  getExaminationsFail,
  getExaminationsSuccess,
  getPatientsFail,
  getPatientsSuccess,
  getRecordingsFail,
  getRecordingsSuccess
} from "../reducers/dashboard";
import {getFiles} from "../../api/files";
import {createExamination, getExaminations, updateExamination} from "../../api/examinations";
import {getPatients} from "../../api/users";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  CreateExaminationData,
  DoctorStatisticsData,
  ExaminationData,
  FileData,
  UpdateExaminationData,
  UserData
} from "../../api/types";
import {getDoctorStatistics} from "../../api/statistics";

export const retrieveExaminations = createAsyncThunk<ExaminationData[], any>(
  "dashboard/retrieveExaminations",
  async (token, {dispatch, getState, rejectWithValue}) => {
    try {
      const res = await getExaminations(
        token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      );

      if (res.status === 200) {
        const examinations = res.data.results;
        const state = getState() as AppState;
        // if examinations are the same as the ones from request
        // do not dispatch anything
        if (state.dashboard.examinations !== examinations) {
          dispatch(getExaminationsSuccess(examinations));
        }
        return examinations;
      } else {
        dispatch(getExaminationsFail());
        return rejectWithValue(res);
      }

    } catch (err) {
      dispatch(getExaminationsFail());
      return rejectWithValue(err);
    }
  }
);

export const addExamination = createAsyncThunk<ExaminationData, CreateExaminationData>(
  "dashboard/addExamination",
  async (payload: CreateExaminationData) => {
    const res = await createExamination(payload);
    return res.data;
  }
);

export const editExamination = createAsyncThunk<ExaminationData, UpdateExaminationData>(
  'dashboard/editExamination',
  async (examinationData: UpdateExaminationData) => {
    const {id, ...payload} = examinationData;
    const res = await updateExamination(id, payload);
    return res.data;
  }
);

export const retrieveRecordings = createAsyncThunk<FileData[], any>(
  "dashboard/retrieveRecordings",
  async (token, {dispatch, getState, rejectWithValue}) => {
    try {
      const res = await getFiles(
        token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      );

      if (res.status === 200) {
        const recordings = res.data.results;
        const state = getState() as AppState;
        // if recordings are the same as the ones from request
        // do not dispatch anything
        if (state.dashboard.recordings !== recordings) {
          dispatch(getRecordingsSuccess(recordings));
        }
        return recordings;
      } else {
        dispatch(getRecordingsFail());
        return rejectWithValue(res);
      }

    } catch (err) {
      dispatch(getRecordingsFail());
      return rejectWithValue(err);
    }
  }
);

export const retrievePatients = createAsyncThunk<UserData[], any>(
  "dashboard/retrievePatients",
  async (token, {dispatch, getState, rejectWithValue}) => {
    try {
      const res = await getPatients(
        token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      );

      if (res.status === 200) {
        const patients = res.data.results;
        const state = getState() as AppState;
        // if patients are the same as the ones from request
        // do not dispatch anything
        if (state.dashboard.patients !== patients) {
          dispatch(getPatientsSuccess(patients));
        }
        return patients;

      } else {
        dispatch(getPatientsFail());
        return rejectWithValue(res);
      }

    } catch (err) {
      dispatch(getPatientsFail());
      return rejectWithValue(err);
    }
  }
);

export const retrieveDoctorStatistics = createAsyncThunk<DoctorStatisticsData, any>(
  'dashboard/retrieveStatistics',
  async (token, {rejectWithValue}) => {
    try {
      const res = await getDoctorStatistics(
        token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      );

      if (res.status === 200) {
        return res.data;
      } else {
        return rejectWithValue(res);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
