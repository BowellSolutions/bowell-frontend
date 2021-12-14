import {getCurrentUser, login, logout, refreshToken, verifyToken} from "../../api/auth";
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
  setAuthLoading
} from "../reducers/auth";
import {clearDashboardData} from "../reducers/dashboard";


export const loginUser =
  (email: string, password: string): AppThunk =>
    async (dispatch) => {
      // set loading to true
      dispatch(setAuthLoading());

      try {
        // send form data to backend
        const res = await login(email, password);

        // if successful, set isAuthenticated to true
        if (res.status === 200) {
          dispatch(loginSuccess());
          dispatch(loadUser());
        } else dispatch(loginFail());

      } catch (err) {
        dispatch(loginFail());
      }

      // set loading to false
      dispatch(removeAuthLoading());
    };

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

export const registerUser = (): AppThunk => async (dispatch) => {
  // to do
};
