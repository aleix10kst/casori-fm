import { useState } from "react";
import { Button } from "../components/Button";
import { useWizard } from "../lib/providers/wizard.provider";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../lib/routes";
import { getQuestionsResults } from "../lib/utils/question-utils.functions";

function ShowNextAction({
  hasAnsweredAllQuestionsCorrectly,
  toggleNextView,
}: {
  hasAnsweredAllQuestionsCorrectly: boolean;
  toggleNextView: (nextView: "pledges" | "farewell") => void;
}) {
  return hasAnsweredAllQuestionsCorrectly ? (
    <div className="w-full">
      <p className="mb-4 text-center font-bold text-xl">
        Has encertat totes les preguntes!
        <br />
        Pots passar a recollir el titol.
      </p>
      <Button className="w-full" onClick={() => toggleNextView("farewell")}>
        Recull el títol
      </Button>
    </div>
  ) : (
    <div className="w-full">
      <p className="mb-4 text-center text-red-500 text-xl">
        Malauradament has fallat alguna pregunta així que... toca pagar alguna
        penyora!
      </p>
      <Button className="mt-4 w-full" onClick={() => toggleNextView("pledges")}>
        Vés a les penyores
      </Button>
    </div>
  );
}

function Results({
  questions,
  correctAnswers,
  wrongAnswers,
  hasAnsweredAllQuestionsCorrectly,
  toggleNextView,
}: {
  questions: number;
  correctAnswers: number;
  wrongAnswers: number;
  hasAnsweredAllQuestionsCorrectly: boolean;
  toggleNextView: (nextView: "pledges" | "farewell") => void;
}) {
  return (
    <div className="flex flex-col items-center gap-y-6 w-4/5">
      <h1 className="text-4xl font-bold">Aquest curs ha anat...</h1>
      <div className="text-center flex flex-col gap-y-2">
        <p className="text-3xl font-bold">
          Preguntes totals: <span>{questions}</span>
        </p>
        <p className="text-2xl font-bold text-green-700">
          Respostes encertades: <span>{correctAnswers}</span>
        </p>
        {!hasAnsweredAllQuestionsCorrectly ? (
          <p className="text-2xl font-bold text-red-600">
            Resposes errònies: <span>{wrongAnswers}</span>
          </p>
        ) : null}
      </div>
      <ShowNextAction
        hasAnsweredAllQuestionsCorrectly={hasAnsweredAllQuestionsCorrectly}
        toggleNextView={toggleNextView}
      />
    </div>
  );
}

export default function ResultsPage() {
  const { questions, answers } = useWizard();
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const { correctAnswers, wrongAnswers } = getQuestionsResults(answers);
  const hasAnsweredAllQuestionsCorrectly = correctAnswers === questions.length;

  const handleShowNextView = (nextView: "farewell" | "pledges") => {
    switch (nextView) {
      case "farewell":
        return navigate(`/${ROUTES.FAREWELL}`);
      case "pledges":
        return navigate(`/${ROUTES.PLEDGES}`);
    }
  };

  return showResults ? (
    <Results
      questions={questions.length}
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      hasAnsweredAllQuestionsCorrectly={hasAnsweredAllQuestionsCorrectly}
      toggleNextView={handleShowNextView}
    />
  ) : (
    <div className="flex flex-col items-center gap-y-6 w-4/5">
      <h1 className="font-bold text-4xl">Felicitats!</h1>
      <p className="text-center text-lg text-gray-600">
        Has contestat totes les preguntes que t'hem preparat. Les hem preparat
        amb molt d'a... molt depressa i corrents a última hora.
        <br />
        <br />
        Anem a veure que tal se t'ha donat això... esperem que hagi anat millor
        que un exàmen de la Bea d'IA o d'en Rigau de FC.
      </p>
      <Button onClick={() => setShowResults(true)}>Descobreix-los</Button>
    </div>
  );
}
