import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import Question, { QuestionLoader } from "./pages/Question.tsx";
import ResultsPage from "./pages/Results.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Welcome />, index: true },
      {
        path: "questions/:slug",
        element: <Question />,
        loader: QuestionLoader,
      },
      { path: "results", element: <ResultsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
