import { UsersUserFull } from 'vk-io';
import { ParserForm } from '../constants';
import { ActionType } from '../../../types/redux';
import {
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
} from './constants';

export type FetchUsers = ActionType<typeof FETCH_USERS, ParserForm>;
type FetchUsersSuccess = ActionType<
  typeof FETCH_USERS_SUCCESS,
  UsersUserFull[]
>;
type FetchUsersError = ActionType<typeof FETCH_USERS_ERROR, void>;

export type ParserActions = FetchUsers | FetchUsersSuccess | FetchUsersError;

const fetchUsers = (data: ParserForm): FetchUsers => {
  return {
    type: FETCH_USERS,
    payload: data,
  };
};

const fetchUsersSuccess = (users: UsersUserFull[]): FetchUsersSuccess => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersError = (): FetchUsersError => {
  return {
    type: FETCH_USERS_ERROR,
  };
};

export { fetchUsers, fetchUsersSuccess, fetchUsersError };
