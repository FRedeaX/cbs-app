/* eslint-disable react/no-array-index-key */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { ChangeEventHandler, FC, useCallback, useState } from "react";

import classes from "./Control.CheckboxGroup.module.css";

type ControlCheckboxGroupProps = {
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

export const ControlCheckboxGroup: FC<ControlCheckboxGroupProps> = ({
  id,
  question,
  answers,
}) => {
  const [isAnother, setIsAnother] = useState(false);
  const [another, setAnother] = useState("");

  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const value = event.target.value.trim();
      if (value) {
        setIsAnother(true);
      } else {
        setIsAnother(false);
      }
      setAnother(event.target.value);
    },
    [],
  );

  return (
    <FormControl margin="normal">
      <FormLabel id={id}>{question}</FormLabel>
      <FormGroup aria-labelledby={id}>
        {answers.map((answer, index) => {
          if (typeof answer === "string") {
            return (
              <FormControlLabel
                key={`${id}_${index}`}
                name={id}
                value={answer}
                control={<Checkbox />}
                label={answer}
              />
            );
          }

          return (
            <div key={`${id}_${index}`} className={classes.another}>
              <FormControlLabel
                name={id}
                value={`${answer.text}: ${another}`}
                control={
                  <Checkbox
                    checked={isAnother}
                    onChange={() => {
                      setIsAnother((prevState) => !prevState);
                    }}
                  />
                }
                label={answer.text}
              />
              <TextField
                required={answer.required && isAnother}
                variant="standard"
                onChange={handleOnChange}
              />
            </div>
          );
        })}
      </FormGroup>
    </FormControl>
  );
};
