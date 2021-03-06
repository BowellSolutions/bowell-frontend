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
 * @file: Exports Redux auth action creators - mostly async thunks
 * Available action creators:
 * - loginUser
 * - getUser
 * - resetRegister
 * - requestTokenRefresh
 * - setRefreshTimer
 * - checkAuth (and additional checkAuthStatus)
 * - logoutUser
 * - registerUser
 **/
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
        token ? {headers: {Authorization: `Bearer ${token}`}, withCredentials: true} : {}
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
        token ? {headers: {Authorization: `Bearer ${token}`}, withCredentials: true} : {});

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
