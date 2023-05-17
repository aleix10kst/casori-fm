import { Question, QuestionDTO } from "../types/question";
import { shuffleArray } from "./array-utils.functions";

export const getNextQuestionSlug = (questions: Question[], slug: string) => {
  const currentQuestionIndex = questions.findIndex(
    ({ slug: questionSlug }) => questionSlug.localeCompare(slug) === 0
  );
  const nextQuestionIndex = currentQuestionIndex + 1;
  if (!nextQuestionIndex || nextQuestionIndex >= questions.length) {
    return "/results";
  }
  return `/questions/${questions[nextQuestionIndex].slug}`;
};

export const buildQuestion = (questionDTO: QuestionDTO): Question => {
  const {
    question_id,
    question,
    answer,
    option_1,
    option_2,
    option_3,
    slug,
    type,
  } = questionDTO;
  const options = shuffleArray([answer, option_1, option_2, option_3]);
  return {
    question_id,
    question: question,
    answer,
    options,
    slug,
    type,
  } satisfies Question;
};
