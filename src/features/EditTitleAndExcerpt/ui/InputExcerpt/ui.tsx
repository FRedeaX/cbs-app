import { InputBase, InputBaseProps } from "@mui/material";
import { FC } from "react";

import { PostCardExcerpt } from "src/entities/card/Post";

import classes from "./InputExcerpt.module.css";

export const InputExcerpt: FC<InputBaseProps> = (props) => (
  <InputBase
    autoComplete="off"
    fullWidth
    multiline
    placeholder="Отрывок"
    slots={{ root: PostCardExcerpt }}
    slotProps={{ input: { className: classes.input } }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);
