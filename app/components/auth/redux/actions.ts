import { AuthForm } from '../constants';
import { ActionType } from '../../../types/redux';
import {
  AUTH,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_WITH_TOKEN,
  AUTH_WITH_TOKEN_ERROR,
  AUTH_WITH_TOKEN_SUCCESS,
} from './constants';

export type Auth = ActionType<typeof AUTH, AuthForm>;
type AuthSuccess = ActionType<typeof AUTH_SUCCESS, string>;
type AuthError = ActionType<typeof AUTH_ERROR, void>;

type AuthWithToken = ActionType<typeof AUTH_WITH_TOKEN, void>;
type AuthWithTokenSuccess = ActionType<typeof AUTH_WITH_TOKEN_SUCCESS, string>;
type AuthWithTokenError = ActionType<typeof AUTH_WITH_TOKEN_ERROR, void>;

export type AuthActions =
  | Auth
  | AuthSuccess
  | AuthError
  | AuthWithToken
  | AuthWithTokenSuccess
  | AuthWithTokenError;

const auth = (credentials: AuthForm): Auth => {
  return {
    type: AUTH,
    payload: credentials,
  };
};

const authSuccess = (token: string): AuthSuccess => {
  return {
    type: AUTH_SUCCESS,
    payload: token,
  };
};

const authError = (): AuthError => {
  return {
    type: AUTH_ERROR,
  };
};

const authWithToken = (): AuthWithToken => {
  return {
    type: AUTH_WITH_TOKEN,
  };
};

const authWithTokenSuccess = (token: string): AuthWithTokenSuccess => {
  return {
    type: AUTH_WITH_TOKEN_SUCCESS,
    payload: token,
  };
};

const authWithTokenError = (): AuthWithTokenError => {
  return {
    type: AUTH_WITH_TOKEN_ERROR,
  };
};

export {
  auth,
  authSuccess,
  authError,
  authWithToken,
  authWithTokenSuccess,
  authWithTokenError,
};
