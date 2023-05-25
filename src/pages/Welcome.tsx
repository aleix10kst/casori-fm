import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../lib/routes";

export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(ROUTES.INTRODUCTION);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-extralight tracking-wide text-gray-400">
          Benvingut a...
        </h2>
        <h1 className="text-4xl font-bold tracking-wide text-gray-800 md:text-6xl">
          casori.fm 📻
        </h1>
        <p className="text-gray-400 font-extralight text-xl">
          L'emisora que reparteix premis entre els seus oients més fidels.
        </p>
      </div>
      <Button onClick={handleStart}>Sintonitza-la</Button>
    </div>
  );
}
