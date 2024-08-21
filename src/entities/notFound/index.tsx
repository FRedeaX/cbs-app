import { Button } from "@mui/material";
import Link from "next/link";

import { Error } from "@/components/Error";
import { FC } from "react";

type NotFoundProps = { title: string };

export const NotFound: FC<NotFoundProps> = ({ title }) => (
  <Error statusCode={404} title={title}>
    <Button sx={{ marginTop: 3 }} href="/" variant="text" LinkComponent={Link}>
      Вернуться на главную
    </Button>
  </Error>
);
