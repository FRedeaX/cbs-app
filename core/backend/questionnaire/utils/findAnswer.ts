import { Answer } from "@/core/backend/questionnaire/types";

export const findAnswer = (answer: string, answers: Answer[]) => {
  const answerTrim = answer.trim();
  const foundAnswer = answers.find(([fa]) => fa === answerTrim);

  // Увеличиваем счетчик, если ответ присуствует
  // или создаем новый вариант ответа если наоборот
  if (foundAnswer) {
    foundAnswer[1] += 1;
  } else {
    answers.push([answerTrim, 1, NaN]);
  }

  return answers;
};
