import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from './components/auth/redux/reducer';
import parserReducer from './components/parser/redux/reducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    parser: parserReducer,
  });
}
