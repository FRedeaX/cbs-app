import { InputBase, InputBaseProps } from "@mui/material";
import { FC } from "react";

import { PostCardTitle } from "src/entities/card/Post/ui";

import classes from "./InputTitle.module.css";

export const InputTitle: FC<InputBaseProps> = (props) => (
  <InputBase
    autoComplete="off"
    fullWidth
    multiline
    placeholder="Заголовок"
    slots={{ root: PostCardTitle }}
    slotProps={{
      input: {
        className: classes.input,
        style: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          textWrap: `balance`,
        },
      },
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);
