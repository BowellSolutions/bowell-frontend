import {combineReducers} from "redux";
import authReducer from "./auth";
import dashboardReducer from "./dashboard";


const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
