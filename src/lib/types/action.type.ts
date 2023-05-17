import { QuestionAnswer } from './question-answer';

export const ACTION = {
  INITIALISE: 'initialise',
  SUBMIT_ANSWER: 'submit answer',
};

export type Actions =
  | { type: 'START' }
  | { type: 'SUBMIT_ANSWER'; payload: QuestionAnswer };
