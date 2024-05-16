import { exceptionLog } from "@/helpers";

import { getMenu } from "../lib";

export const getHeaderMenu = async () => {
  try {
    const primaryData = getMenu({ id: "header_menu-primary" });
    const secondaryData = getMenu({ id: "header_menu-secondary" });

    const [primary, secondary] = await Promise.all([
      primaryData,
      secondaryData,
    ]);

    return { primary, secondary };
  } catch (error) {
    exceptionLog(error);
    return { primary: null, secondary: null };
  }
};
