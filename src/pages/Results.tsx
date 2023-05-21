import { useState } from "react";
import { Button } from "../components/Button";
import { useWizard } from "../lib/providers/wizard.provider";

function ShowNextAction({
  hasAnsweredAllQuestionsCorrectly,
  toggleNextView,
}: {
  hasAnsweredAllQuestionsCorrectly: boolean;
  toggleNextView: (nextView: "pledges" | "summary") => void;
}) {
  return hasAnsweredAllQuestionsCorrectly ? (
    <div className="w-full">
      <p className="mb-4 text-center font-bold text-xl">
        Has encertat totes les preguntes!
        <br />
        Pots passar a recollir el titol.
      </p>
      <Button className="w-full" onClick={() => toggleNextView("summary")}>
        Recull el títol
      </Button>
    </div>
  ) : (
    <div className="w-full">
      <p className="mb-4 text-center text-red-500 text-xl">
        Malauradament has fallat alguna pregunta així que... toca reucperar.
      </p>
      <Button className="mt-4 w-full" onClick={() => toggleNextView("pledges")}>
        Vés a les recuepracions
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
  toggleNextView: (nextView: "pledges" | "summary") => void;
}) {
  return (
    <div className="flex flex-col space-y-8 w-full">
      <h1 className="text-4xl font-bold text-center">Aquest curs ha anat...</h1>
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

export function Pledges() {
  return <div>Aquí hi aniran les penyores</div>;
}

export function Summary({
  hasAnsweredAllQuestionsCorrectly,
}: {
  hasAnsweredAllQuestionsCorrectly: boolean;
}) {
  return (
    <div className="text-center space-y-2">
      {hasAnsweredAllQuestionsCorrectly ? (
        <>
          <p className="font-bold text-xl">
            Doncs sembla que has tret matrícula d'honor! Qui ho havia de dir...
          </p>
          <p className="text-gray-200 font-bold">{`(Com en Pau de Jesus a Habilitats Directives i de Comunicació)`}</p>
        </>
      ) : (
        <p className="font-bold text-xl">
          Mentre tothom ja havia començat les vacances, tu encara estaves
          estudiant per a les recus. Però... finalment has aprovat tot net!
          Enhorabona!
        </p>
      )}

      <p className="text-xl font-bold">
        Pots anar a la taula dels frikis que han fet aquest test a recollir el
        titol.
      </p>
      <p className="text-3xl">
        T'estimem i us estimem Puig i Maria. Que sigueu molt feliços {`<3`}
      </p>
    </div>
  );
}

export default function ResultsPage() {
  const { questions, answers } = useWizard();
  const [showResults, setShowResults] = useState(false);
  const [showPledges, setShowPledges] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const { correctAnswers, wrongAnswers } = answers.reduce<{
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
  const hasAnsweredAllQuestionsCorrectly = correctAnswers === questions.length;

  const handleShowNextView = (nextView: "summary" | "pledges") => {
    switch (nextView) {
      case "summary":
        setShowPledges(false);
        setShowSummary(true);
        break;
      case "pledges":
        setShowPledges(true);
        setShowSummary(false);
        break;
    }
  };

  return showSummary ? (
    <Summary
      hasAnsweredAllQuestionsCorrectly={hasAnsweredAllQuestionsCorrectly}
    />
  ) : showPledges ? (
    <Pledges />
  ) : showResults ? (
    <Results
      questions={questions.length}
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      hasAnsweredAllQuestionsCorrectly={hasAnsweredAllQuestionsCorrectly}
      toggleNextView={handleShowNextView}
    />
  ) : (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-4 pb-8">
        <p className="text-3xl text-center font-semibold tracking-wide">
          Ha estat un any molt dur i els exàmens han estat molt durs... però és
          hora de veure les notes.
        </p>
        <p className="text-center text-sm text-gray-600">
          O... et tocarà anar a recuperar alguna assignatura ;)
        </p>
      </div>
      <Button onClick={() => setShowResults(true)}>Descobreix-les</Button>
    </div>
  );
}
