import {getCurrentUser, login, logout, refreshToken, verifyToken} from "../../api/auth";
import {Dispatch} from "redux";
import {
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_FAIL,
  REFRESH_SUCCESS,
  REMOVE_AUTH_LOADING,
  RESET_REGISTER_SUCCESS,
  SET_AUTH_LOADING
} from "./types";
import {ACCESS_TOKEN_LIFETIME} from "../../config";


export const loginUser = (username: string, password: string) => async (dispatch: Dispatch<any>) => {
  // set loading to true
  dispatch({type: SET_AUTH_LOADING});

  try {
    // send form data to backend
    const res = await login(username, password);

    // if successful, set isAuthenticated to true
    if (res.status === 200) {
      dispatch({type: LOGIN_SUCCESS});
      dispatch(loadUser());
    } else dispatch({type: LOGIN_FAIL});

  } catch (err) {
    dispatch({type: LOGIN_FAIL});
  }

  // set loading to false
  dispatch({type: REMOVE_AUTH_LOADING});
};

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await getCurrentUser();
    const userData = res.data;

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: userData
      });
    } else dispatch({type: LOAD_USER_FAIL});

  } catch (err) {
    dispatch({type: LOAD_USER_FAIL});
  }
};

export const resetRegisterSuccess = () => (dispatch: Dispatch) => {
  dispatch({type: RESET_REGISTER_SUCCESS});
};


export const requestTokenRefresh = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await refreshToken();

    if (res.status === 200) {
      dispatch({type: REFRESH_SUCCESS});
      dispatch(checkAuthStatus());
    } else dispatch({type: REFRESH_FAIL});

  } catch (err) {
    dispatch({type: REFRESH_FAIL});
  }
};

export const setRefreshTimer = () => (dispatch: Dispatch<any>) => {
  setTimeout(() => {
    dispatch(requestTokenRefresh());
  }, Number(ACCESS_TOKEN_LIFETIME) * 1000);
};

export const checkAuthStatus = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await verifyToken();

    if (res.status === 200) {
      dispatch({type: AUTHENTICATED_SUCCESS});
      dispatch(setRefreshTimer());
      dispatch(loadUser());
    } else {
      dispatch({type: AUTHENTICATED_FAIL});
    }
  } catch (err) {
    dispatch({type: AUTHENTICATED_FAIL});
  }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await logout();

    if (res.status === 200) dispatch({type: LOGOUT_SUCCESS});
    else dispatch({type: LOGOUT_FAIL});

  } catch (err) {
    dispatch({type: LOGOUT_FAIL});
  }
};

export const registerUser = () => async (dispatch: Dispatch) => {
  // to do
};
