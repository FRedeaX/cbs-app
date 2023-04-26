import dynamic from "next/dynamic";

import { TableProps } from "./Table";

export const Table = dynamic<TableProps>(() =>
  import("./Table").then((res) => res.Table),
);
