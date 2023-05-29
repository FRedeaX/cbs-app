import { FormControl, FormLabel, TextField } from "@mui/material";
import { FC } from "react";

type ControlTextFieldProps = {
  id: string;
  question: string;
};

export const ControlTextField: FC<ControlTextFieldProps> = ({
  id,
  question,
}) => (
  <FormControl margin="normal">
    <FormLabel id={id}>{question}</FormLabel>
    <TextField name={id} variant="standard" size="small" />
  </FormControl>
);
