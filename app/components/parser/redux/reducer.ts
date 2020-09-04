import { UsersUserFull } from 'vk-io';
import { ParserActions } from './actions';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from './constants';

type ParserState = {
  isFetching: boolean;
  isError: boolean;
  users: UsersUserFull[];
};

const initialState: ParserState = {
  isFetching: false,
  isError: false,
  users: [],
};

function parserReducer(
  state: ParserState = initialState,
  action: ParserActions
) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...initialState,
        isFetching: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...initialState,
        isFetching: false,
        users: action.payload || [],
      };
    case FETCH_USERS_ERROR:
      return {
        ...initialState,
        isError: true,
      };
    default:
      return state;
  }
}

export default parserReducer;
