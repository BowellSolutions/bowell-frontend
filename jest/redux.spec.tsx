import AuthReducer, {
  authFail,
  authSuccess,
  loadUserFail,
  loadUserSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess, refreshFail, refreshSuccess,
  removeAuthLoading,
  resetRegisterSuccess,
  setAuthLoading
} from "../src/redux/reducers/auth";
import {Action} from "redux";
import {UserData} from "../src/api/types";

describe("test auth reducer", () => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    register_success: false,
    user: null
  };

  it('should return the initial state', () => {
    expect(AuthReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it('should reset register success', () => {
    const prevState = {
      ...initialState,
      register_success: true,
    };

    expect(AuthReducer(prevState, resetRegisterSuccess)).toEqual({
      ...prevState,
      register_success: false,
    });
  });

  it('should handle login success state', () => {
    expect(AuthReducer(initialState, loginSuccess)).toEqual({
      ...initialState,
      isAuthenticated: true,
    });
  });

  it('should handle login fail state', () => {
    expect(AuthReducer(initialState, loginFail)).toEqual({
      ...initialState,
      isAuthenticated: false,
    });
  });

  it('should handle logout success state', () => {
    expect(AuthReducer(initialState, logoutSuccess)).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
    });
  });

  it('should handle logout fail state', () => {
    const prevState = {
      ...initialState,
      isAuthenticated: true,
      user: {} as UserData,
    };
    // state should not change if logout did not work
    expect(AuthReducer(prevState, logoutFail)).toEqual(prevState);
  });

  it('should set loading to true', () => {
    expect(AuthReducer(initialState, setAuthLoading)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should set loading to true', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    expect(AuthReducer(prevState, removeAuthLoading)).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should load user', () => {
    const prevState = {
      ...initialState,
      isAuthenticated: true,
      user: null,
    };

    const user = {
      id: 1,
      username: 'test',
      email: 'test@gmail.com',
      first_name: 'testo',
      last_name: 'viron',
      last_login: new Date(),
      is_active: true,
      is_staff: true,
      is_superuser: true,
      date_joined: new Date(),
      groups: [],
      user_permissions: [],
    };

    expect(AuthReducer(prevState, loadUserSuccess(user))).toEqual({
      ...prevState,
      isAuthenticated: true,
      user: user,
    });
  });

  it('should fail user load', () => {
    expect(AuthReducer(initialState, loadUserFail)).toEqual({
      ...initialState,
      user: null,
    });
  });

  it('should refresh token successfully', () => {
    expect(AuthReducer(initialState, refreshSuccess)).toEqual({
      ...initialState,
      isAuthenticated: true,
    });
  });

  it('should fail token refresh', () => {
    const prevState = {
      ...initialState,
      isAuthenticated: true,
      user: {} as UserData,
    };

    expect(AuthReducer(prevState, refreshFail)).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
    });
  });

  it('should authenticate successfully', () => {
    expect(AuthReducer(initialState, authSuccess)).toEqual({
      ...initialState,
      isAuthenticated: true,
    });
  });

  it('should fail authentication', () => {
    expect(AuthReducer(initialState, authFail)).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
    });
  });
});
