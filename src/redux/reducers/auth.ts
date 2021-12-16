import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {UserData} from "../../api/types";

interface State {
  user: null | UserData,
  isAuthenticated: boolean,
  loading: boolean,
  register_success: boolean,
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
};


export const authSlice = createSlice({
  name: 'auth',

  initialState: initialState,

  reducers: {
    setRegisterSuccess: (state) => {
      state.register_success = true;
    },
    resetRegisterSuccess: (state) => {
      state.register_success = false;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFail: (state) => {
      state.isAuthenticated = false;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
    },
    logoutFail: () => {
    },
    setAuthLoading: (state) => {
      state.loading = true;
    },
    removeAuthLoading: (state) => {
      state.loading = false;
    },
    loadUserSuccess: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loadUserFail: (state) => {
      state.user = null;
    },
    refreshSuccess: (state) => {
      state.isAuthenticated = true;
    },
    refreshFail: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    authSuccess: (state) => {
      state.isAuthenticated = true;
    },
    authFail: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});


export const {
  setRegisterSuccess,
  resetRegisterSuccess,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  setAuthLoading,
  removeAuthLoading,
  loadUserSuccess,
  loadUserFail,
  refreshSuccess,
  refreshFail,
  authSuccess,
  authFail
} = authSlice.actions;

export default authSlice.reducer;
