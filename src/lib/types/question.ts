export type Question = {
  questionId: number;
  question: string;
  answer: string;
  options: string[];
  type: "raw" | "image";
  slug: string;
};
