import { FETCH_QUESTIONS } from './types';

export function fetchQuestions(questions) {
  return {
    type: FETCH_QUESTIONS,
    questions
  };
}
