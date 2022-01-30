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
 * @file: Exports dashboardSlice, dashboard actions and reducer, state interface, websocket status.
 * dashboard state:
 *  - patients
 *  - examinations
 *  - recordings
 *  - statistics
 *  - notifications
 *  - websocket_status
 **/
import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {DoctorStatisticsData, ExaminationData, FileData, HydrateAction, UserData} from "../../api/types";
import {addExamination, editExamination, retrieveDoctorStatistics} from "../actions/dashboard";

export type WebsocketStatus =
  "Connecting" |
  "Open" |
  "Closing" |
  "Closed" |
  "Uninstantiated";

export interface DashboardState {
  patients: UserData[],
  examinations: ExaminationData[],
  recordings: FileData[],
  statistics: DoctorStatisticsData | null,
  notifications: any[],
  websocket_status: WebsocketStatus,
}

const initialState: DashboardState = {
  patients: [],
  examinations: [],
  recordings: [],
  statistics: null,
  notifications: [],
  websocket_status: "Uninstantiated",
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

    addNotification: (state, action) => {
      // add new notification to the beginning of an array
      state.notifications = [action.payload, ...state.notifications];
    },

    detachRecording: (state, action) => {
      const index = state.examinations.findIndex(ex => ex.id === action.payload.id);
      state.recordings[index] = {
        ...state.recordings[index],
        examination: null,
      };
    },

    updateExamination: (state, action) => {
      const index = state.examinations.findIndex(ex => ex.id === action.payload.id);
      state.examinations[index] = {
        ...state.examinations[index],
        ...action.payload,
      };
    },

    removeNotification: (state, action) => {
      const index = action.payload;
      state.notifications = state.notifications.filter((_, idx) => idx !== index);
    },

    setWebsocketStatus: (state, action) => {
      state.websocket_status = action.payload;
    },

    clearDashboardData: state => {
      state.examinations = [];
      state.patients = [];
      state.recordings = [];
      state.statistics = null;
      state.notifications = [];
      state.websocket_status = "Uninstantiated";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(retrieveDoctorStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
    });

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
        // notifications and ws connection are only client sided
        notifications: state.notifications,
        websocket_status: state.websocket_status,
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
  updateExamination,
  detachRecording,
  addNotification,
  removeNotification,
  setWebsocketStatus,
  clearDashboardData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
