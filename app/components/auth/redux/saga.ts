import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AUTH,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_WITH_TOKEN,
  AUTH_WITH_TOKEN_ERROR,
  AUTH_WITH_TOKEN_SUCCESS,
} from './constants';
import { Auth } from './actions';

const {
  loginWithCredentials,
  loginWithToken,
} = require('electron').remote.require('./api/auth');

function* makeAuth(action: Auth) {
  try {
    const response = yield call(loginWithCredentials, action.payload);
    const token = response?.token;

    if (token) {
      yield put({ type: AUTH_SUCCESS, payload: token });
    } else {
      yield put({ type: AUTH_ERROR });
    }
  } catch (e) {
    yield put({ type: AUTH_ERROR });
  }
}

function* authWithToken() {
  try {
    const response = yield call(loginWithToken);
    const token = response.token.toString();
    if (token) {
      yield put({ type: AUTH_WITH_TOKEN_SUCCESS, payload: token });
    } else {
      yield put({ type: AUTH_WITH_TOKEN_ERROR });
    }
  } catch (e) {
    yield put({ type: AUTH_WITH_TOKEN_ERROR });
  }
}

function* watchAuth() {
  yield takeEvery(AUTH, makeAuth);
  yield takeEvery(AUTH_WITH_TOKEN, authWithToken);
}

export default watchAuth;
