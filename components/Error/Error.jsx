/* eslint-disable no-console */
import Link from "next/link";
import { useEffect } from "react";

import { exceptionLog } from "../../helpers";
import Button from "../UI/Button/Button";

const Error = ({ route }) => {
  useEffect(() => {
    exceptionLog({ ...route, cstMessage: "404 page" });
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
