import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useWizard } from "../lib/providers/wizard.provider";
import { ROUTES } from "../lib/routes";

export default function Introduction() {
  const { questions } = useWizard();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/${ROUTES.QUESTION}/${questions[0].slug}`);
  };
  return (
    <div className="flex flex-col items-center gap-y-6 w-4/5">
      <h1 className="font-bold text-4xl">Funcionament</h1>
      <p className="text-slate-900 text-lg font-light">
        El funcionament és similar als concursos de{" "}
        <span className="font-bold">los 40 </span> on regalen iPhones si et saps
        cordar les sabates. O com un exàmen de la carrera, mateixa dificultat.
        <br />
        <br />
        Et presentem un seguit de preguntes expressament seleccionades pels
        nostres experts en Xarxes, PROSO, EDA, IA, FC, PLP i PDS que hauràs de
        respondre correctament per passar de curs i obtenir la més gran de les
        recompenses: unes braves al Konig. Estàs preparat? ;)
      </p>
      <Button onClick={handleStart} className="w-2/6">
        Comença el test
      </Button>
    </div>
  );
}
