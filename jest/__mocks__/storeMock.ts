import configureStore from "redux-mock-store";
import {AppState, AppThunk} from "../../src/redux/store";
import thunk from 'redux-thunk';

const middlewares = [thunk];
const storeMock = configureStore<AppState, AppThunk>(middlewares);

export {storeMock};
