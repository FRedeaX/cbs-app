import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { FC, FormEventHandler, useCallback, useState } from "react";

import classes from "./Questionnaire.module.css";
import { ControlCheckboxGroup } from "./components/Control.CheckboxGroup/Control.CheckboxGroup";
import { ControlRadioGroup } from "./components/Control.RadioGroup/Control.RadioGroup";
import { ControlTextField } from "./components/Control.TextField/Control.TextField";

type QuestionnaireData = {
  id: string;
  type: "radio" | "checkbox" | "textField";
  question: string;
  answers: (
    | string
    | {
        text: string;
      }
  )[];
};

const questionnaireData: QuestionnaireData[] = [
  {
    id: "q1",
    type: "radio",
    question: "1. Выберите Ваш пол:",
    answers: ["Мужской", "Женский"],
  },
  {
    id: "q2",
    type: "radio",
    question: "2. Укажите Ваш возраст:",
    answers: ["7-18", "19-29", "30-55", "Старше 55"],
  },
  {
    id: "q3",
    type: "radio",
    question: "3. Посещаете ли Вы библиотеку?",
    answers: ["Да", "Нет"],
  },
  {
    id: "q4",
    type: "radio",
    question: "4. Если да, то как часто?",
    answers: [
      "Каждый день",
      "Раз в несколько дней",
      "Раз в неделю",
      "Раз в две недели",
      "Раз в месяц",
      { text: "Другое" },
    ],
  },
  {
    id: "q5",
    type: "checkbox",
    question:
      "5. В какие дни и время Вам удобнее посещать библиотеку? (отметьте все варианты)",
    answers: [
      "Будние с 9:00 до 17:00",
      "Будние с 17:00 до 21:00",
      "Выходные с 9:00 до 17:00",
      "Выходные с 17:00 до 19:00",
      { text: "Другое" },
    ],
  },
  {
    id: "q6",
    type: "radio",
    question:
      "6. Если Вы выбрали для посещения выходные, то какой день удобнее для посещения?",
    answers: ["Суббота", "Воскресенье"],
  },
  {
    id: "q7",
    type: "radio",
    question: "7. Выберите Ваше образование:",
    answers: [
      "Основное общее образование",
      "Незаконченное высшее образование",
      "Среднее общее образование",
      "Высшее образование",
      "Среднее профессиональное образование",
    ],
  },
  {
    id: "q8",
    type: "radio",
    question: "8.	Укажите Ваш род занятий:",
    answers: [
      "Учащийся, студент",
      "Лицо свободной профессии",
      "Служащий",
      "Рабочий",
      "Пенсионер",
      "Веду домашнее хозяйство",
      "Безработный, временно не работающий",
      "ИП",
      { text: "Другое" },
    ],
  },
  {
    id: "q9",
    type: "radio",
    question: "9. Какое направление литературы вы предпочитаете:",
    answers: [
      "Научная и научно-популярная",
      "Справочная",
      "Учебная",
      "Техническая",
      "Художественная",
      "Документальная",
      "Мемуарная",
      "Детская",
      { text: "Другое" },
    ],
  },
  {
    id: "q10",
    type: "textField",
    question: "10. Укажите жанры литературы, которые Вы предпочитаете:",
    answers: [],
  },
  {
    id: "q11",
    type: "radio",
    question: "11. Какой формат вам удобен для разного направления литературы:",
    answers: ["Бумажный", "Электронный"],
  },
  {
    id: "q12",
    type: "radio",
    question:
      "12. Выберите тип журнала, который Вы читаете/хотели бы читать регулярно:",
    answers: [
      "Автомобили и спорт",
      "Психология",
      "Строительство и ремонт",
      "Дизайн. Интерьер.",
      "Компьютеры и технологии",
      "Молодежные журналы",
      "Наука и техника",
      "Сад и огород",
      "Экология",
      "Журналы, посвященные хобби",
      "Кулинария",
      "Мода и стиль. Шитье. Вязание.",
      "Политика и экономика",
      "Семья, дети",
      "Детские журналы",
      "ЗОЖ и спорт",
      "Литература. Искусство. Творчество",
      "Музыка и кино",
      { text: "Свой вариант" },
    ],
  },
  {
    id: "q13",
    type: "radio",
    question:
      "13. Какое мероприятие, проводимое в Библиотеке, было бы Вам особенно интересно?",
    answers: [
      "Тематические дискуссии",
      "Познавательные и развлекательные квесты",
      "Киноклуб (просмотр с обсуждением)",
      "Лекции",
      "Встречи по интересам (шахматы, карты, домино, коллекционеры, художники и т.д.)",
      "Мастер-классы",
      "Библиотечные конкурсы и акции",
      "Встречи с представителями культуры, науки, образования, медицины, юриспруденции",
    ],
  },
  {
    id: "q14",
    type: "textField",
    question: "14. Уточните тематику интересующего Вас мероприятия:",
    answers: [],
  },
  {
    id: "q15",
    type: "radio",
    question:
      "15. Если принять во внимание определение, что Библиотека – это центр социальной, культурной, образовательной жизни, какие дополнительные, отличные от базовых библиотечных сервисы и услуги Вы хотели бы видеть в Библиотеке:",
    answers: [
      "Буфет/кафетерий",
      "Печать/сканирование/ксерокопия",
      "Фотопечать",
      "Виртуальная справочная служба",
      "Доступ в Интернет, электронная почта",
      { text: "Свой вариант" },
    ],
  },
  {
    id: "q16",
    type: "radio",
    question: "16. Чему Вы бы хотели дополнительно научиться?",
    answers: [
      "Иностранный язык",
      "Риторика и русский язык",
      "Пользование Интернетом, в т.ч. порталами госуслуг",
      "Использование современных гаджетов",
      "Пользование компьютером и компьютерными программами",
      "Прикладное искусство",
    ],
  },
  {
    id: "q17",
    type: "textField",
    question: "17. Ваше хобби?",
    answers: [],
  },
  {
    id: "q18",
    type: "textField",
    question:
      "18. Готовы ли Вы на общественных началах участвовать и/или проводить в Библиотеке мастер-классы, лекции, теоретические занятия, творческие вечера, др. Укажите тематику:",
    answers: [],
  },
  {
    id: "q19",
    type: "textField",
    question:
      "19. Если готовы, напишите, пожалуйста, номер Вашего телефона или адрес электронной почты:",
    answers: [],
  },
];

export const Questionnaire: FC = () => {
  const [isLoading, seLIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isThanks, setIsThanks] = useState(false);
  const [submitText, setSubmitText] = useState("Отправить");

  const handleOnSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      seLIsLoading(true);
      setIsSent(true);

      const form = new FormData(event.currentTarget);
      const data: Record<string, unknown[]> = {};

      questionnaireData.forEach(({ id }) => {
        data[id] = form.getAll(id);
      });

      const res = await fetch("/api/questionnaire", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        setIsThanks(true);
        seLIsLoading(false);
      } else {
        setSubmitText("Ошибка, попробовать отправить еще раз");
        setIsSent(false);
        seLIsLoading(false);
      }
    },
    [],
  );

  return (
    <>
      <form className={classes.form} onSubmit={handleOnSubmit}>
        {questionnaireData.map(({ id, type, question, answers }) => {
          switch (type) {
            case "radio": {
              return (
                <ControlRadioGroup
                  key={id}
                  id={id}
                  question={question}
                  answers={answers}
                />
              );
            }
            case "checkbox": {
              return (
                <ControlCheckboxGroup
                  key={id}
                  id={id}
                  question={question}
                  answers={answers}
                />
              );
            }
            case "textField": {
              return <ControlTextField key={id} id={id} question={question} />;
            }

            default:
              return null;
          }
        })}
        <LoadingButton
          type="submit"
          disabled={isSent}
          loading={isLoading}
          loadingPosition="center"
          className={classes.Button}>
          {submitText}
        </LoadingButton>
      </form>
      {isThanks && (
        <>
          <Typography align="center" variant="responsiveText" paddingTop={1}>
            Благодарим за Ваши ответы!
          </Typography>
          <Typography align="center" variant="responsiveText">
            Скоро увидите, как Ваша библиотека изменится, благодаря Вам.
          </Typography>
        </>
      )}
    </>
  );
};
