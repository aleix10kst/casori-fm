import { Question } from "../types/question";

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
