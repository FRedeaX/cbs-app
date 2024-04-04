import { Button } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

import { Error } from "@/components/Error";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

const NotFound = () => (
  <Error statusCode={404} title="Страница не найдена">
    <Button sx={{ marginTop: 3 }} href="/" variant="text" LinkComponent={Link}>
      Вернуться на главную
    </Button>
  </Error>
);

export default NotFound;
