import React from "react";
import Button from "~/components/UI/Button/Button";
// import { isFront } from "~/helpers";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  // reloadHendler = () => {
  //   if (isFront()) window.location.reload();
  // };

  // reloadHendler = useMemo(() => {
  //   if (isFront()) window.location.reload();
  // }, []);

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
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

    return this.props.children;
  }
}
