import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Actions } from "../types/action.type";
import { Question } from "../types/question";
import { QuestionAnswer } from "../types/question-answer";
type WizardState = {
  questions: Question[];
  answers: QuestionAnswer[];
};

type WizardContext = {
  state: WizardState;
  dispatch: Dispatch<Actions>;
};

const Context = createContext<WizardContext | undefined>(undefined);

function reducer(state: WizardState, action: Actions): WizardState {
  switch (action.type) {
    case "SUBMIT_ANSWER": {
      const newState = {
        ...state,
        answers: [...state.answers, action.payload],
      };
      return newState;
    }
  }
  return state;
}

export default function WizardProvider({
  questions,
  children,
}: {
  questions: Question[];
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    reducer,
    { questions: [], answers: [], currentQuestion: 0 },
    () => ({ questions, answers: [], currentQuestion: 0 })
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children} </Context.Provider>
  );
}

export const useWizard = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useWizard must be used inside WizardProvider");
  }

  return context;
};
