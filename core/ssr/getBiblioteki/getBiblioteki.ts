import { ERROR_MESSAGE } from "@/constants";

import { clientGetBibliotekiQuery } from "./gql/getBibliotekiGQL";
import { transformFields } from "./utils/transformFields";

export const getBiblioteki = async () => {
  const { data, error, errors } = await clientGetBibliotekiQuery();

  if (error !== undefined) throw error;
  if (data === undefined) throw errors;
  if (data.page === null) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

  const { title, excerpt, children } = data.page;

  const filialList = children.nodes
    .map((filial) => transformFields(filial))
    .sort((a, b) => a.order - b.order);

  return { title, description: excerpt, filialList };
};
