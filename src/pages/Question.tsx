import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { useWizard } from "../lib/providers/wizard.provider";
import { getNextQuestionSlug } from "../lib/utils/question-utils.functions";
import { Button } from "../components/Button";
import { Question } from "../lib/types/question";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { shuffleArray } from "../lib/utils/array-utils.functions";

const isAnswerCorrect = (selectedAnswer: string, answer: string) =>
  selectedAnswer.localeCompare(answer) === 0;

export default function Question() {
  const question = useLoaderData() as Question;
  const { questions, answerQuestion } = useWizard();
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleAnswer = (question: Question) => {
    if (selected === null) {
      return;
    }
    const selectedAnswer = question.options[selected];
    const result = isAnswerCorrect(selectedAnswer, question.answer);
    answerQuestion(question.questionId, result);
    setResult(result);
  };

  const handleNext = () => {
    setResult(null);
    setSelected(null);
    const nextQuestionSlug = getNextQuestionSlug(questions, question.slug);
    navigate(nextQuestionSlug);
  };

  if (!question) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex w-full flex-col items-center gap-y-8 px-16">
      <div className="flex flex-col gap-y-4 text-center">
        <p className="text-2xl font-bold tracking-wider">{question.question}</p>
      </div>

      <div className="w-full max-w-md">
        <div className="mx-auto w-full">
          <RadioGroup
            value={selected}
            onChange={setSelected}
            disabled={result !== null}
          >
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <RadioGroup.Option
                  key={option}
                  value={index}
                  className={({ active, checked }) =>
                    clsx(
                      "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none",
                      active &&
                        "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-yellow-300",
                      checked &&
                        result === null &&
                        "bg-yellow-400 bg-opacity-75 text-white",
                      !checked && result === null && "bg-white",
                      checked && result === true && "bg-green-600",
                      checked && result === false && "bg-red-600",
                      result === false &&
                        isAnswerCorrect(option, question.answer) &&
                        "bg-green-400"
                    )
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {option}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      {result === null ? (
        <Button className="w-56" onClick={() => handleAnswer(question)}>
          Contesta
        </Button>
      ) : (
        <Button className="w-56" onClick={handleNext}>
          Següent
        </Button>
      )}
    </div>
  );
}

export async function QuestionLoader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  const response = await fetch("/questions.json");
  const questions = (await response.json()) as Question[];
  if (!questions?.length) {
    throw Error("Question not found");
  }
  const question = questions.find((question) => question.slug === slug)!;
  return {
    ...question,
    options: shuffleArray(question.options),
  } satisfies Question;
}
