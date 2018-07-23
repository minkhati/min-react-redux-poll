import { FETCH_QUESTIONS, ADD_QUESTION, QUESTION_ANSWER } from './types';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then(question => dispatch(addQuestion(question)));
  };
}

function addQuestionAnswer({ qid, question, authedUser, answer }) {
  return {
    type: QUESTION_ANSWER,
    qid,
    question,
    authedUser,
    answer
  };
}

export function handleAddQuestionAnswer(info) {
  return dispatch => {
    dispatch(addQuestionAnswer(info));

    return saveQuestionAnswer(info).catch(e => {
      console.warn('Error in handleAddQuestionAnswer: ', e);
      dispatch(addQuestionAnswer(info));
      alert('There was an error polling the tweet. Try again!');
    });
  };
}
