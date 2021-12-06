import { transformBlocks } from "./blocks";
import { preparingPaths } from "./menu";
import { paginationLoad } from "./pagination";
import { removeDuplicateTag } from "./removeDuplicateTag";
import { loadPreview } from "./preview";
import { getMenu } from "./menu";
import { plaiceholder } from "./plaiceholder";

export {
  paginationLoad,
  removeDuplicateTag,
  preparingPaths,
  loadPreview,
  transformBlocks,
  getMenu,
  plaiceholder,
};

export const removeBackslash = (str) => str.replace(/^\/|\/$/g, "");
