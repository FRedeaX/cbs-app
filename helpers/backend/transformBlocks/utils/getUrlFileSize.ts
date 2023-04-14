import { partial } from "filesize";
import ufs from "url-file-size";

import { Nullable } from "../../../typings/utility-types";

const size = partial({
  base: 2,
  standard: "jedec",
  symbols: { KB: "КБ", MB: "МБ" },
});

export type GetUrlFileSizeResult = {
  fileSize: Nullable<string>;
};

export const getUrlFileSize = async (
  url: string,
): Promise<GetUrlFileSizeResult> => {
  try {
    const bytesSize = await ufs(url);
    const fileSize = size(bytesSize).toString();

    return { fileSize };
  } catch (error) {
    return { fileSize: null };
  }
};
