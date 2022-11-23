import { getShortID } from "../../../../../routes/Post/Post.utils";

export const concatenationID = (
  parentID?: string,
  childID?: string,
): string | undefined => {
  if (parentID === undefined || childID === undefined) return undefined;

  return `${parentID}${getShortID(childID)}`;
};
