import { GetStaticPathsResult } from "next";

type Path = { slug: string };

export type GetPathsToPosts = Exclude<
  GetStaticPathsResult<Path>["paths"][0],
  string
>[];
