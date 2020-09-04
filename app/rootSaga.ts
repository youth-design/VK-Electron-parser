import { all } from 'redux-saga/effects';
import watchAuth from './components/auth/redux/saga';
import watchParser from './components/parser/redux/saga';

export default function* rootSaga() {
  yield all([watchAuth(), watchParser()]);
}
