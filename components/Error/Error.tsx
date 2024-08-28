import { Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import * as styles from "./styles";

export type ErrorProps = {
  statusCode: number;
  title: string;
};

export const Error: FC<PropsWithChildren<ErrorProps>> = ({
  statusCode,
  title,
  children,
}) => (
  <div sx={styles.root}>
    <div sx={styles.body}>
      <Typography sx={styles.statusCode} component="h1" variant="subtitle2">
        {statusCode}
      </Typography>
      <Typography component="h2">{title}.</Typography>
    </div>
    {children}
  </div>
);
