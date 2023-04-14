import {
  FileBlockGQL,
  FileBlockGQLAttributes,
} from "../../../../../components/blocks/File/utils/fileGQL";
import { exceptionLog } from "../../../../exceptionLog";
import {
  GetUrlFileSizeResult,
  getUrlFileSize,
} from "../../utils/getUrlFileSize";
import { TransformBlocks, TransformErrorBlock } from "../../utils/type";

export type TransformFileBlock = {
  attributes: FileBlockGQLAttributes & GetUrlFileSizeResult;
};

export const transformFileBlock = async (
  fileBlock: TransformBlocks<FileBlockGQL>,
): Promise<TransformBlocks<TransformFileBlock | TransformErrorBlock>> => {
  try {
    const { fileSize } = await getUrlFileSize(fileBlock.attributes.href);

    return {
      name: fileBlock.name,
      attributes: {
        ...fileBlock.attributes,
        fileSize,
      },
    };
  } catch (error) {
    exceptionLog(error);

    return {
      name: `error: ${fileBlock.name}`,
      message: (error as Error).message,
      attributes: null,
      innerBlocks: null,
    };
  }
};
