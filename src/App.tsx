import { useEffect, useState } from "react";

import { Question } from "./lib/types/question";
import { supabase } from "./lib/supabase/supabase.client";
import { buildQuestion } from "./lib/utils/question-utils.functions";
import WizardProvider from "./lib/providers/wizard.provider";
import { Wizard } from "./components/Wizard";
import { Outlet } from "react-router-dom";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  async function getQuestions() {
    const { data } = await supabase.from("question").select("*");
    setQuestions((data ?? []).map(buildQuestion));
  }

  useEffect(() => {
    getQuestions();
  }, []);

  if (questions.length === 0) {
    return <div></div>;
  }

  return (
    <WizardProvider questions={questions}>
      <div className="grid h-full place-items-center bg-yellow-400 px-8">
        <Wizard>
          <Outlet />
        </Wizard>
      </div>
    </WizardProvider>
  );
}

export default App;
