import { client } from "@/lib/apollo/client";
import { exceptionLog } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";
import { FETCH_MENU, MenuGQL } from "@/components/Header/utils/menuGQL";

type GetMenuResult = Nullable<MenuGQL["menus"]["nodes"]>;

export const getMenu = async (): Promise<GetMenuResult> => {
  try {
    const { data, error, errors } = await client.query<MenuGQL>({
      query: FETCH_MENU,
    });

    if (error !== undefined) throw error;
    if (data === undefined) throw errors;

    return data.menus.nodes;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
