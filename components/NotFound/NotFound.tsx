import { Button } from "@mui/material";
import Link from "next/link";

export const NotFound = () => (
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
    </h1>
    <Link href="/">
      <Button variant="outlined">На главную</Button>
    </Link>
  </div>
);
