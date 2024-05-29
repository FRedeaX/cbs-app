import { partial } from "filesize";
import ufs from "url-file-size";

const size = partial({
  base: 2,
  standard: "jedec",
  symbols: { KB: "КБ", MB: "МБ" },
});

export type GetUrlFileSizeResult = {
  fileSize: string;
};

export const getUrlFileSize = async (
  url: string,
): Promise<GetUrlFileSizeResult> => {
  const encodeURL = new URL(url);
  const bytesSize = await ufs(encodeURL);
  const fileSize = size(bytesSize).toString();

  return { fileSize };
};
