import { Answer } from "@/core/backend/questionnaire/types";
import { findAnswer } from "@/core/backend/questionnaire/utils/findAnswer";
import { percentageOfAmount } from "@/core/backend/questionnaire/utils/percentageOfAmount";
import { Maybe } from "@/helpers/typings/utility-types";

type GroupingResult = Record<string, Maybe<Answer[]>>;

export const groupingOfAnswers = (
  questionnaire: Record<string, string | string[]>[],
) => {
  // Цикл по анкетам.
  const res = questionnaire.reduce((acc: GroupingResult, crr) => {
    // Цикл по ответам 1 анкеты.
    Object.entries(crr).forEach(([key, value]) => {
      let answers = acc[key] ?? [];

      if (typeof value === "string") {
        answers = findAnswer(value, answers);
      } else if (value instanceof Array) {
        // Цикл по ответам 1 вопроса анкеты.
        value.forEach((answer) => {
          answers = findAnswer(answer, answers);
        });
      }

      acc[key] = percentageOfAmount(answers);
    });

    return acc;
  }, {});

  return res;
};
