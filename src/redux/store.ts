import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import rootReducer from './reducers';
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";

/* Next-Redux-Wrapper with Redux Toolkit  */

const makeStore = () => configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppThunkDispatch = ThunkDispatch<AppState, void, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
