import { Button } from "@mui/material";
import { Component, ReactNode, ErrorInfo } from "react";

import { exceptionLog } from "@/helpers";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  /**
   * @default false
   */
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    exceptionLog({ error, errorInfo });
  }

  render() {
    const {
      props: { children },
      state: { hasError },
    } = this;
    if (hasError) {
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
            }}>
            Что-то пошло не так...
            <br />
            Попробуйте обновить страницу.
          </h1>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Обновить
          </Button>
        </div>
      );
    }

    return children;
  }
}
