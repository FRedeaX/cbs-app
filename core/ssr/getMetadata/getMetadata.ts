import { exceptionLog } from "@/helpers";

import { SSRError } from "../utils/ssrEror";

import { clientGetMetadataQuery } from "./gql/getMetadataGQL";

type GetMetadata = {
  description: string;
  title: string;
};

const FALLBACK_METADATA: GetMetadata = {
  description:
    "Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур",
  title: "Библиотеки города Байконур",
};

export const getMetadata = async (): Promise<GetMetadata> => {
  const { data, error, errors } = await clientGetMetadataQuery();

  if (error !== undefined) {
    exceptionLog(new SSRError(error.message));
  }
  if (data === undefined && error === undefined) {
    exceptionLog(errors);
  }

  return {
    description: data.description || FALLBACK_METADATA.description,
    title: data.title || FALLBACK_METADATA.title,
  };
};
