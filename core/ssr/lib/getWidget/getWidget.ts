import { exceptionLog } from "@/helpers";

import { SSRError } from "../../utils/ssrEror";

import { clientGetWidgetQuery } from "./gql/getWidgetGQL";

export const getWidget = async (uri: string) => {
  try {
    const { data, error, errors } = await clientGetWidgetQuery({
      variables: { id: uri },
    });

    if (error !== undefined) {
      throw new SSRError(error.message, { error, uri });
    }
    if (data === undefined) throw errors;
    const { page } = data;
    if (page === null) return null;

    return page;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
