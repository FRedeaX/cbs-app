import { Answer } from "@/core/backend/questionnaire/types";

export const percentageOfAmount = (answers: Answer[]): Answer[] => {
  // Считаем общее количество ответов.
  const countOfAnswers = answers.reduce((acc, crr) => acc + crr[1], 0);

  return answers.map((answer) => {
    const percentage = (answer[1] * 100) / countOfAnswers;
    return [answer[0], answer[1], percentage];
  });
};
