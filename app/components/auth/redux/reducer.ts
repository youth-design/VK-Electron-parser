import {
  AUTH,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_WITH_TOKEN,
  AUTH_WITH_TOKEN_ERROR,
  AUTH_WITH_TOKEN_SUCCESS,
} from './constants';
import { AuthActions } from './actions';

type AuthState = {
  isFetching: boolean;
  isError: boolean;
  token: string;
  isAuthorized: boolean;
};

const initialState: AuthState = {
  isFetching: false,
  isError: false,
  token: '',
  isAuthorized: false,
};

const AuthReducer = (
  state: AuthState = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AUTH:
      return {
        ...initialState,
        isFetching: true,
      };
    case AUTH_SUCCESS:
      return {
        ...initialState,
        token: action.payload || '',
        isAuthorized: true,
      };
    case AUTH_ERROR:
      return {
        ...initialState,
        isError: true,
      };
    case AUTH_WITH_TOKEN:
      return {
        ...initialState,
        isFetching: true,
      };
    case AUTH_WITH_TOKEN_SUCCESS:
      return {
        ...initialState,
        token: action.payload || '',
        isAuthorized: true,
      };
    case AUTH_WITH_TOKEN_ERROR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default AuthReducer;
