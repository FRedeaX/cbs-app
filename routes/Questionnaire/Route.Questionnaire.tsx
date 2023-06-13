import { Typography } from "@mui/material";
import { FC } from "react";

import classes from "./Route.Questionnaire.module.css";
import { Questionnaire } from "@/components/Questionnaire/Questionnaire";
import { RouteContainer } from "@/components/RouteContainer/RouteContainer";

export const RouteQuestionnaire: FC = () => (
  <RouteContainer className={classes.root}>
    <div className={classes.header}>
      <Typography align="center" variant="h1">
        Анкета пользователя{" "}
        <span className={classes.subtitle}>
          Библиотеки Модельного стандарта
        </span>
      </Typography>
    </div>
    <Questionnaire />
  </RouteContainer>
);
