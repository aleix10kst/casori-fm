import { useEffect } from "react";
import { Button } from "../components/Button";
import { useWizard } from "../lib/providers/wizard.provider";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const {
    state: { questions },
    dispatch,
  } = useWizard();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "START" });
  }, [dispatch]);

  const handleStart = () => {
    navigate(`/questions/${questions[0].slug}`);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="text-center">
        <h2 className="text-xl font-extralight tracking-wide text-gray-400">
          Benvingut al...
        </h2>
        <h1 className="text-4xl font-bold tracking-wide text-gray-800 md:text-6xl">
          Casori.fm
        </h1>
      </div>
      <Button onClick={handleStart}>Comença</Button>
    </div>
  );
}
