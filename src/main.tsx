import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import Question, { QuestionLoader } from "./pages/Question.tsx";
import ResultsPage from "./pages/Results.tsx";
import Introduction from "./pages/Introduction.tsx";
import { ROUTES } from "./lib/routes.ts";
import Pledges, { PledgesLoader } from "./pages/Pledges.tsx";
import Farewell from "./pages/Farewell.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: ROUTES.INTRODUCTION, element: <Introduction /> },
      {
        path: `${ROUTES.QUESTION}/:slug`,
        element: <Question />,
        loader: QuestionLoader,
      },
      { path: ROUTES.RESULTS, element: <ResultsPage /> },
      { path: ROUTES.PLEDGES, element: <Pledges />, loader: PledgesLoader },
      { path: ROUTES.FAREWELL, element: <Farewell /> },
      { path: ROUTES.LANDING, element: <Welcome />, index: true },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
