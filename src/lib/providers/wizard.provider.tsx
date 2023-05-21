import { useOutletContext } from "react-router-dom";
import { Question } from "../types/question";
import { QuestionAnswer } from "../types/question-answer";

export function useWizard() {
  return useOutletContext<{
    questions: Question[];
    answers: QuestionAnswer[];
    answerQuestion: (questionId: number, correct: boolean) => void;
  }>();
}
