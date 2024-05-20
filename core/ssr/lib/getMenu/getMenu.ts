import { exceptionLog } from "@/helpers";

import { GetMenuQueryVariables, clientGetMenuQuery } from "./gql/getMenuGQL";

export const getMenu = async (variables: GetMenuQueryVariables) => {
  try {
    const { data, error, errors } = await clientGetMenuQuery({
      variables,
    });

    if (error !== undefined) throw error;
    if (data === undefined) throw errors;

    return data.menu?.menuItems.nodes ?? null;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
