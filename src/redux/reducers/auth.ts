import {checkAuth, getUser} from "../actions/auth";
import {HydrateAction, UserData} from "../../api/types";
import {HYDRATE} from "next-redux-wrapper";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface AuthState {
  user: null | UserData,
  isAuthenticated: boolean,
  loading: boolean,
  register_success: boolean,
}

const initialState: AuthState = {
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

  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuthenticated = false;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      const serverState = action.payload.auth;

      return {
        ...state,
        ...serverState,
        // persist user when switching pages
        user: serverState.user != null ? serverState.user : state.user,
      };
    });
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
