/**
 * @author: Adam Lisichin
 * @file: Contains Redux store configuration, exports types and wrapper.
 * Redux store was integrated with Next.js using:
 *  - next-redux-wrapper
 *  - @redux/toolkit
 **/
import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import rootReducer from './reducers';
import {configureStore} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";


const makeStore = () => configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  }
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppThunkDispatch = ThunkDispatch<AppState, void, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
