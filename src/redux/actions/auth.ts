import {getCurrentUser, login, logout, refreshToken, register, verifyToken} from "../../api/auth";
import {ACCESS_TOKEN_LIFETIME} from "../../config";
import type {AppThunk} from "../store";
import {
  authFail,
  authSuccess,
  loadUserFail,
  loadUserSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  refreshFail,
  refreshSuccess,
  removeAuthLoading,
  resetRegisterSuccess,
  setAuthLoading, setRegisterSuccess
} from "../reducers/auth";
import {clearDashboardData} from "../reducers/dashboard";
import {LoginUserData, RegisterUserData, UserData} from "../../api/types";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk<any, LoginUserData>(
  'auth/loginUser',
  async (credentials, {dispatch, rejectWithValue}) => {
    const {email, password} = credentials;
    // set loading to true
    dispatch(setAuthLoading());

    try {
      // send form data to backend
      const res = await login(email, password);

      // if successful, set isAuthenticated to true
      if (res.status === 200 && res) {
        dispatch(removeAuthLoading());
        dispatch(loginSuccess());
        dispatch<any>(loadUser());
        return res.data;
      } else {
        dispatch(removeAuthLoading());
        dispatch(loginFail());
        return rejectWithValue(res);
      }
    } catch (err: any) {
      dispatch(removeAuthLoading());
      dispatch(loginFail());
      if (err.response) {
        return rejectWithValue(err.response?.data?.detail);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await getCurrentUser();
    const userData = res.data;

    if (res.status === 200) {
      dispatch(loadUserSuccess(userData));
    } else dispatch(loadUserFail());

  } catch (err) {
    dispatch(loadUserFail());
  }
};

export const resetRegister = (): AppThunk => (dispatch) => {
  dispatch(resetRegisterSuccess());
};


export const requestTokenRefresh = (): AppThunk => async (dispatch) => {
  try {
    const res = await refreshToken();

    if (res.status === 200) {
      dispatch(refreshSuccess());
      await dispatch(checkAuthStatus());
    } else dispatch(refreshFail());

  } catch (err) {
    dispatch(refreshFail());
  }
};

export const setRefreshTimer = (): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(requestTokenRefresh());
  }, Number(ACCESS_TOKEN_LIFETIME) * 1000);
};

export const checkAuthStatus = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await verifyToken();
    const state = getState();

    if (res.status === 200) {
      dispatch(authSuccess());
      dispatch(setRefreshTimer());

      // do not fetch user if it is already inside the store
      if (state.auth.user == null) {
        dispatch(loadUser());
      }

    } else {
      dispatch(authFail());
    }
  } catch (err) {
    dispatch(authFail());
  }
};

export const logoutUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await logout();

    if (res.status === 200) {
      dispatch(logoutSuccess());
      dispatch(clearDashboardData());
    } else dispatch(logoutFail());

  } catch (err) {
    dispatch(logoutFail());
  }
};

export const registerUser = createAsyncThunk<UserData, RegisterUserData>(
  'auth/registerUser',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const res = await register(payload);

      if (res.status === 201) {
        dispatch(setRegisterSuccess());
        return res.data;
      } else {
        dispatch(resetRegisterSuccess());
        return rejectWithValue(res.data);
      }

    } catch (err: any) {
      dispatch(resetRegisterSuccess());
      if (err.response) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue(err.message);
    }
  }
);
