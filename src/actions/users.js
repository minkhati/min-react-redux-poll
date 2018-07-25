import { FETCH_USERS, ADD_USER } from './types';
import { saveUser } from '../utils/api';
import { setAuthedUser } from '../actions/authedUser';

export function fetchUsers(users) {
  return {
    type: FETCH_USERS,
    users
  };
}

function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function handleAddUser(
  userName,
  avatarURL = 'https://randomuser.me/api/portraits/lego/6.jpg'
) {
  return (dispatch, getState) => {
    return saveUser({
      userName,
      avatarURL
    })
      .then(user => dispatch(addUser(user)))
      .then(user => dispatch(setAuthedUser(user.user.id)));
  };
}
