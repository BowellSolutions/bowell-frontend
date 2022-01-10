import DashboardReducer from "../../src/redux/reducers/dashboard";
import {Action} from "redux";

describe('Test dashboard reducer', () => {
  const initialState = {
    patients: [],
    examinations: [],
    recordings: [],
    statistics: null,
    notifications: [],
    websocket_status: "Uninstantiated",
  };

  it('should return the initial state', () => {
    expect(DashboardReducer(undefined, {} as Action)).toEqual(initialState);
  });
});
