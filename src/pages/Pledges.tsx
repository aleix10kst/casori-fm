import { useLoaderData, useNavigate } from "react-router-dom";
import { useWizard } from "../lib/providers/wizard.provider";
import { getQuestionsResults } from "../lib/utils/question-utils.functions";
import { Button } from "../components/Button";
import { ROUTES } from "../lib/routes";

export default function Pledges() {
  const pledges = useLoaderData() as string[];
  const { answers } = useWizard();
  const navigate = useNavigate();

  const { wrongAnswers } = getQuestionsResults(answers);
  const pledgesToDo =
    wrongAnswers > pledges.length ? pledges : pledges.slice(0, wrongAnswers);

  return (
    <div className="flex flex-col items-center gap-y-6 w-4/5">
      <h1 className="font-bold text-4xl">Penyores</h1>
      <p className="text-slate-900 text-lg font-light">
        A continuació et presentem les penyores que hauràs de complir per
        obtenir els teus desitjats macarrons.
      </p>
      <div className="flex flex-col gap-y-4">
        {pledgesToDo.map((pledge) => (
          <label className="inline-flex items-center" key={pledge}>
            <input
              type="checkbox"
              className="
                rounded
                bg-gray-200
                border-transparent
                focus:border-transparent focus:bg-gray-200
                text-gray-700
                focus:ring-1 focus:ring-offset-2 focus:ring-gray-500
              "
            />
            <span className="ml-2 text-slate-900 text-lg">{pledge}</span>
          </label>
        ))}
      </div>
      <Button
        className="w-full"
        onClick={() => navigate(`/${ROUTES.FAREWELL}`)}
      >
        Finalitza el test
      </Button>
    </div>
  );
}

export async function PledgesLoader() {
  const response = await fetch("/pledges.json");
  const pledges = (await response.json()) as string[];
  return pledges;
}
