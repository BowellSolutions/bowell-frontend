import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {ExaminationData, FileData, HydrateAction, UserData} from "../../api/types";
import {addExamination, editExamination} from "../actions/dashboard";

export interface DashboardState {
  patients: UserData[],
  examinations: ExaminationData[],
  recordings: FileData[],
  statistics?: any, // not done yet
}

const initialState: DashboardState = {
  patients: [],
  examinations: [],
  recordings: [],
  statistics: null, // not done yet
};


export const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: initialState,

  reducers: {
    getPatientsSuccess: (state, action) => {
      state.patients = action.payload;
    },
    getPatientsFail: (state) => {
    },

    getRecordingsSuccess: (state, action) => {
      state.recordings = action.payload;
    },
    getRecordingsFail: (state) => {
    },

    getExaminationsSuccess: (state, action) => {
      state.examinations = action.payload;
    },
    getExaminationsFail: (state) => {
    },

    clearDashboardData: state => {
      state.examinations = [];
      state.patients = [];
      state.recordings = [];
      state.statistics = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addExamination.fulfilled, (state, action) => {
      state.examinations = [...state.examinations, action.payload];
    });

    builder.addCase(editExamination.fulfilled, (state, action) => {
      const index = state.examinations.findIndex(ex => ex.id === action.payload.id);
      state.examinations[index] = {
        ...state.examinations[index],
        ...action.payload,
      };
    });

    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      const srvState = action.payload.dashboard;

      return {
        // do not allow server to clear state - persist values between switching pages
        examinations: srvState.examinations.length > 0 ? srvState.examinations : state.examinations,
        patients: srvState.patients.length > 0 ? srvState.patients : state.patients,
        recordings: srvState.recordings.length > 0 ? srvState.recordings : state.recordings,
        statistics: srvState.statistics != null ? srvState.statistics : state.statistics,
      };
    });
  },

});


export const {
  getPatientsSuccess,
  getPatientsFail,
  getRecordingsSuccess,
  getRecordingsFail,
  getExaminationsSuccess,
  getExaminationsFail,
  clearDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
