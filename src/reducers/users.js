import {
  ADD_USER,
  FETCH_USERS,
  ADD_QUESTION,
  QUESTION_ANSWER
} from '../actions/types';

export default function users(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS: {
      return {
        ...state,
        ...action.users
      };
    }
    case ADD_USER: {
      const { user } = action;
      return {
        ...state,
        [user.id]: user
      };
    }
    case ADD_QUESTION: {
      const { id, author } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions.concat([id])]
        }
      };
    }
    case QUESTION_ANSWER: {
      const { qid, answer, authedUser } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}
