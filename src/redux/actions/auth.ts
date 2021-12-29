import {getCurrentUser, login, logout, refreshToken, register, verifyToken} from "../../api/auth";
import {ACCESS_TOKEN_LIFETIME} from "../../config";
import type {AppThunk} from "../store";
import {
  authFail,
  authSuccess,
  loadUserFail,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  refreshFail,
  refreshSuccess,
  removeAuthLoading,
  resetRegisterSuccess,
  setAuthLoading,
  setRegisterSuccess
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
        dispatch<any>(getUser(undefined));
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

export const getUser = createAsyncThunk<UserData, any>(
  'auth/getUser',
  async (token, {dispatch, rejectWithValue}) => {
    try {
      const res = await getCurrentUser(
        token ? {headers: {Authorization: `Bearer ${token}`}} : {}
      );
      const userData = res.data;

      if (res.status === 200) {
        return userData;
      } else {
        dispatch(loadUserFail());
        return rejectWithValue(res);
      }

    } catch (err) {
      dispatch(loadUserFail());
      return rejectWithValue(err);
    }
  },
);

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

export const checkAuth = createAsyncThunk<{}, any>(
  'auth/checkAuth',
  async (token, {dispatch, rejectWithValue}) => {
    try {
      const res = await verifyToken(
        token,
        token ? {headers: {Authorization: `Bearer ${token}`}} : {});

      if (res.status === 200) {
        dispatch(authSuccess());
        dispatch<any>(setRefreshTimer());
        await dispatch(getUser(token));
        return res.data;
      } else {
        dispatch(authFail());
        return rejectWithValue(res);
      }
    } catch (err) {
      dispatch(authFail());
      return rejectWithValue(err);
    }
  },
);

// change later
export const checkAuthStatus = (): AppThunk => async (dispatch, getState) => {
  try {
    const res = await verifyToken();
    const state = getState();

    if (res.status === 200) {
      dispatch(authSuccess());
      dispatch(setRefreshTimer());

      // do not fetch user if it is already inside the store
      if (state.auth.user == null) {
        dispatch(getUser(undefined));
      }

    } else {
      dispatch(authFail());
    }
  } catch (err) {
    dispatch(authFail());
  }
};

export const logoutUser = createAsyncThunk<{}, void>(
  'auth/logoutUser',
  async (arg, {dispatch, rejectWithValue}) => {
    try {
      const res = await logout();

      if (res.status === 200) {
        dispatch(logoutSuccess());
        dispatch(clearDashboardData());
        return res.data;
      } else {
        dispatch(logoutFail());
        return rejectWithValue(res);
      }

    } catch (err) {
      dispatch(logoutFail());
      return rejectWithValue(err);
    }
  }
);

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
