"use client";

import { Snackbar, Alert, AlertTitle, Typography } from "@mui/material";
import { FC, useEffect } from "react";

import { useToggle } from "@/helpers/frontend/hooks";
import { WPGQLError } from "src/shared/api";

type ErrorAlertProps = {
  error: WPGQLError;
};

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  const [isError, setError, { setTrue }] = useToggle(true);

  useEffect(() => {
    setTrue();
    // eslint-disable-next-line no-console
    console.error({ error });
  }, [error, setTrue]);

  return (
    <Snackbar open={isError}>
      <Alert severity="error" sx={{ maxWidth: 440 }} onClose={setError}>
        <AlertTitle color="inherit">
          Произошла ошибка при сохранении записи
        </AlertTitle>
        {error.response.errors.map(({ message }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{message}</div>
        ))}
        <Typography variant="caption" color="inherit" mt={0.2}>
          подробнее см. в консоли
        </Typography>
      </Alert>
    </Snackbar>
  );
};
