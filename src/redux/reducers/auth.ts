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
 * @file: Exports authSlice, auth actions and reducer, state interface.
 * auth state:
 *  - user
 *  - isAuthenticated
 *  - loading
 *  - register_success
 **/
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
