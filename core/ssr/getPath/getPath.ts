import { GetStaticPathsResult } from "next";

import { recursiveLoadParties } from "@/helpers/backend";

import { isSkipPage } from "../utils/isSkipPage";

import { GetPathQuery, getPathDocument } from "./gql/getPathGQL";

type Path = { pageSlug: string[] };

export const getPath = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return [];

  const path: GetStaticPathsResult<Path>["paths"] = [];
  await recursiveLoadParties<GetPathQuery>({
    query: getPathDocument,
    callbackFn: ({ pages }) => {
      pages.nodes.forEach(({ uri, template }) => {
        if (isSkipPage({ template })) return;

        const pageSlug = uri.split("/").filter(Boolean);
        path.push({ params: { pageSlug } });
      });
    },
    pageInfoCallback: (data) => data.pages.pageInfo,
  });

  return path;
};
