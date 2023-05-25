import { ROUTES } from "../routes";
import { Question } from "../types/question";
import { QuestionAnswer } from "../types/question-answer";

export const getNextQuestionSlug = (questions: Question[], slug: string) => {
  const currentQuestionIndex = questions.findIndex(
    ({ slug: questionSlug }) => questionSlug.localeCompare(slug) === 0
  );
  const nextQuestionIndex = currentQuestionIndex + 1;
  if (!nextQuestionIndex || nextQuestionIndex >= questions.length) {
    return "/resultats";
  }
  return `/${ROUTES.QUESTION}/${questions[nextQuestionIndex].slug}`;
};

export const getQuestionsResults = (answers: QuestionAnswer[]) =>
  answers.reduce<{
    correctAnswers: number;
    wrongAnswers: number;
  }>(
    (acc, answer) => ({
      correctAnswers: answer.correct
        ? acc.correctAnswers + 1
        : acc.correctAnswers,
      wrongAnswers: !answer.correct ? acc.wrongAnswers + 1 : acc.wrongAnswers,
    }),
    { correctAnswers: 0, wrongAnswers: 0 }
  );
