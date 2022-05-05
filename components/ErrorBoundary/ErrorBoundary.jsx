/* eslint-disable no-console */
import { captureException } from "@sentry/nextjs";
import { Component } from "react";
import Button from "../UI/Button/Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error({ error });
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
    // You can also log the error to an error reporting service
    captureException({ error, errorInfo, cstMessage: "ErrorBoundary" });
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
          <Button theme="gray" onClick={() => window.location.reload()}>
            Обновить
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
