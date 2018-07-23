import { getInitialData } from '../utils/api';
import { fetchUsers } from './users';
import { fetchQuestions } from './questions';
import { setAuthedUser } from './authedUser';

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(fetchUsers(users));
      dispatch(fetchQuestions(questions));
      dispatch(setAuthedUser(null));
    });
  };
}
