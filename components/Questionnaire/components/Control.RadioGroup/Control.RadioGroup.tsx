/* eslint-disable react/no-array-index-key */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
  RadioGroup,
} from "@mui/material";
import { ChangeEventHandler, FC, useCallback, useState } from "react";

import classes from "./Control.RadioGroup.module.css";

type ControlRadioGroupProps = {
  id: string;
  question: string;
  answers: (
    | string
    | {
        text: string;
        required?: boolean;
      }
  )[];
};

export const ControlRadioGroup: FC<ControlRadioGroupProps> = ({
  id,
  question,
  answers,
}) => {
  const [radioChecked, setRadioChecked] = useState("");
  const [another, setAnother] = useState("");

  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value.trim();
      setAnother(value);
    },
    [],
  );

  return (
    <FormControl margin="normal">
      <FormLabel id={id}>{question}</FormLabel>
      <RadioGroup aria-labelledby={id} name={id}>
        {answers.map((answer, index) => {
          if (typeof answer === "string") {
            return (
              <FormControlLabel
                key={`${id}_${index}`}
                value={answer}
                control={
                  <Radio
                    checked={radioChecked === `${id}_${index}`}
                    onChange={() => {
                      setRadioChecked(`${id}_${index}`);
                    }}
                  />
                }
                label={answer}
              />
            );
          }

          return (
            <div key={`${id}_${index}`} className={classes.another}>
              <FormControlLabel
                value={`${answer.text}: ${another}`}
                control={
                  <Radio
                    checked={radioChecked === `${id}_${index}`}
                    onChange={() => {
                      setRadioChecked(`${id}_${index}`);
                    }}
                  />
                }
                label={answer.text}
              />
              <TextField
                required={answer.required && radioChecked === `${id}_${index}`}
                variant="standard"
                size="small"
                onChange={handleOnChange}
                onFocus={() => {
                  setRadioChecked(`${id}_${index}`);
                }}
              />
            </div>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
