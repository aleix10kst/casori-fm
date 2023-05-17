import { useEffect, useState } from "react";

import { Question } from "./lib/types/question";
import { supabase } from "./lib/supabase/supabase.client";
import { buildQuestion } from "./lib/utils/question-utils.functions";
import WizardProvider from "./lib/providers/wizard.provider";
import { Wizard } from "./components/Wizard";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  async function getQuestions() {
    const { data } = await supabase.from("question").select("*");
    setQuestions((data ?? []).map(buildQuestion));
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <WizardProvider questions={questions}>
      <div className="grid h-full place-items-center bg-yellow-400 px-8">
        <Wizard>Content</Wizard>
      </div>
    </WizardProvider>
  );
}

export default App;
