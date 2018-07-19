import { FETCH_USERS } from './types';

export function fetchUsers(users) {
  return {
    type: FETCH_USERS,
    users
  };
}
