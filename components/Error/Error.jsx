/* eslint-disable no-console */
import { captureException } from "@sentry/nextjs";
import Link from "next/link";
import { useEffect } from "react";

import Button from "../UI/Button/Button";

const Error = ({ route }) => {
  useEffect(() => {
    console.error({ route });
    // You can also log the error to an error reporting service
    captureException(route, "Error");
  }, [route]);

  return (
    <div
      style={{
        textAlign: "center",
      }}>
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "400",
        }}>
        Страница не найдена
        {/* <br />
          Перейти на главную страницу. */}
      </h1>
      <Link href="/" passHref>
        <Button view="link">На главную</Button>
      </Link>
    </div>
  );
};

export default Error;
