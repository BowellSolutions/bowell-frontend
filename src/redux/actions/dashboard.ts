import {AppThunk} from "../store";
import {
  getExaminationsFail, getExaminationsSuccess,
  getPatientsFail,
  getPatientsSuccess,
  getRecordingsFail,
  getRecordingsSuccess
} from "../reducers/dashboard";
import {getFiles} from "../../api/files";
import {getExaminations} from "../../api/examinations";
import {getPatients} from "../../api/patients";

export const loadExaminations = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await getExaminations();

    if (res.status === 200) {
      const examinations = res.data;
      console.log(examinations);
      const state = getState();
      // if examinations are the same as the ones from request
      // do not dispatch anything
      if (state.dashboard.examinations !== examinations) {
        dispatch(getExaminationsSuccess(examinations));
      }
    } else {
      dispatch(getExaminationsFail());
    }

  } catch (e) {
    dispatch(getExaminationsFail());
  }
};

export const loadRecordings = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await getFiles();

    if (res.status === 200) {
      const recordings = res.data;
      const state = getState();
      // if recordings are the same as the ones from request
      // do not dispatch anything
      if (state.dashboard.recordings !== recordings) {
        dispatch(getRecordingsSuccess(recordings));
      }
    } else {
      dispatch(getRecordingsFail());
    }

  } catch (e) {
    dispatch(getRecordingsFail());
  }
};


export const loadPatients = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await getPatients();

    if (res.status === 200) {
      const patients = res.data;
      const state = getState();
      // if patients are the same as the ones from request
      // do not dispatch anything
      if (state.dashboard.patients !== patients) {
        dispatch(getPatientsSuccess(patients));
      }

    } else {
      dispatch(getPatientsFail());
    }

  } catch (e) {
    dispatch(getPatientsFail());
  }
};



