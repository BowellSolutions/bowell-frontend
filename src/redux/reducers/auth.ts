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
} from "../actions/types";

interface State {
  user: null,
  isAuthenticated: boolean,
  loading: boolean,
  register_success: boolean,
}

interface Action {
  type: string,
  payload: any,
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
};

const authReducer = (state: State = initialState, action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case RESET_REGISTER_SUCCESS:
      return {
        ...state,
        register_success: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case LOGOUT_FAIL:
      return state;

    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case LOAD_USER_FAIL:
      return state;

    case REFRESH_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;
