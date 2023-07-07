import {
  FETCH_MENU,
  MenuGQL,
  MenuItemsGQL,
} from "../../../components/Header/utils/menuGQL";
import { exceptionLog } from "../../../helpers/exceptionLog";
import { Nullable } from "../../../helpers/typings/utility-types";
import { client } from "../../../lib/apollo/client";

type GetMenuResult = Nullable<MenuItemsGQL>;

export const getMenu = async (isCache = true): Promise<GetMenuResult> => {
  try {
    const { data, error } = await client.query<MenuGQL>({
      query: FETCH_MENU,
    });

    if (error !== undefined) throw error;
    return data.menus.nodes;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
