import { Button } from "@mui/material";
import { useEffect, FC } from "react";

import { exceptionLog } from "@/helpers";
import { Void } from "@/helpers/typings/utility-types";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: Void;
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error, reset }) => {
  useEffect(() => {
    exceptionLog(error);
  }, [error]);

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
      }}>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "400",
          marginTop: "24px",
        }}>
        Что-то пошло не так...
      </h1>
      <Button sx={{ marginRight: 1 }} variant="outlined" onClick={reset}>
        Пробовать снова
      </Button>
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={() => window.location.reload()}>
        Обновить страницу
      </Button>
      <Button
        variant="outlined"
        onClick={() => window.location.replace(window.location.origin)}>
        На главную
      </Button>
    </div>
  );
};
