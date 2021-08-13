import { transformBlocks } from "./blocks";
import { preparingPaths } from "./menu";
import { paginationLoad } from "./pagination";
import { removeDuplicateTag } from "./post";
import { postersFilter } from "./poster";
import { loadPreview } from "./preview";
import { getMenu } from "./menu";

export {
  postersFilter,
  paginationLoad,
  removeDuplicateTag,
  preparingPaths,
  loadPreview,
  transformBlocks,
  getMenu,
};

export const removeBackslash = (str) => str.replace(/^\/|\/$/g, "");
