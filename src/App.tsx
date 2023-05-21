import { useEffect, useState } from "react";
import { Wizard } from "./components/Wizard";
import { Outlet } from "react-router-dom";
import { Question } from "./lib/types/question";
import { QuestionAnswer } from "./lib/types/question-answer";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswer] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const questions = (await response.json()) as Question[];
        setQuestions(questions);
      } catch (error) {
        setQuestions([]);
      }
    };
    getQuestions();
  }, []);

  const answerQuestion = (questionId: number, correct: boolean) => {
    console.log(questionId, correct);
    setAnswer((answers) => [...answers, { questionId, correct }]);
  };

  if (!questions?.length) {
    return <div>Loading</div>;
  }

  return (
    <div className="grid h-full place-items-center bg-yellow-400 px-8">
      <Wizard>
        <Outlet context={{ questions, answers, answerQuestion }} />
      </Wizard>
    </div>
  );
}

export default App;
