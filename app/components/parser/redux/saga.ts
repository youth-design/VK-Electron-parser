import { put, takeEvery, select } from 'redux-saga/effects';
import { UsersUserFull } from 'vk-io';
import { FetchUsers } from './actions';
import { token as selectToken } from '../../auth/redux/selectors';
import {
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
} from './constants';

const { parseUsers } = require('electron').remote.require('./api/parser');

function* fetchUsers(action: FetchUsers) {
  try {
    // eslint-disable-next-line global-require
    const token = yield select(selectToken);
    const users: UsersUserFull = yield parseUsers(action.payload, token);
    yield put({ type: FETCH_USERS_SUCCESS, payload: users });
  } catch (e) {
    console.log('File: app/components/parser/redux/saga.ts, Row: 11', e);
    yield put({ type: FETCH_USERS_ERROR });
  }
}

function* watchParser() {
  yield takeEvery(FETCH_USERS, fetchUsers);
}

export default watchParser;
