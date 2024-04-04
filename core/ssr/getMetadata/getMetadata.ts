import { exceptionLog } from "@/helpers";

import { SSRError } from "../utils/ssrEror";

import { clientGetMetadataQuery } from "./gql/getMetadataGQL";

type GetMetadata = {
  description: string;
  title: string;
  url: string;
};

const FALLBACK_METADATA: GetMetadata = {
  description:
    "Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур",
  title: "Библиотеки города Байконур",
  url: "https://cbsbaikonur.ru",
};

export const getMetadata = async (): Promise<GetMetadata> => {
  const { data, error, errors } = await clientGetMetadataQuery();

  if (error !== undefined) {
    exceptionLog(new SSRError(error.message));
  }
  if (data === undefined && error === undefined) {
    exceptionLog(errors);
  }

  const { description, title, url } = data.generalSettings;

  return {
    description: description || FALLBACK_METADATA.description,
    title: title || FALLBACK_METADATA.title,
    url: url || FALLBACK_METADATA.url,
  };
};
