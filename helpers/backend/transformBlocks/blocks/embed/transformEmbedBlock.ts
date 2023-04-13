import {
  EmbedBlockGQL,
  EmbedBlockGQLAttributes,
} from "../../../../../components/blocks/Embed/utils/embedGQL";
import { Nullable } from "../../../../typings/utility-types";
import {
  TransformBlocks,
  TransformErrorBlock,
  VideoByBloks,
} from "../../utils/type";

type YoutubeResponseOembed = {
  title: string;
  author_name: string;
  author_url: string;
  type: "video";
  height: number;
  width: number;
  version: string;
  provider_name: "YouTube";
  provider_url: "https://www.youtube.com/";
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

type stringOrNull = Nullable<string>;

export type TransformEmbedBlock = {
  attributes: {
    html: stringOrNull;
    aspectRatio: string;
  } & Omit<EmbedBlockGQLAttributes, "className" | "providerNameSlug">;
};

type TransformEmbedBlockResult = {
  block: TransformBlocks<TransformEmbedBlock | TransformErrorBlock>;
  video: Nullable<VideoByBloks>;
};

export const transformEmbedBlock = async (
  embedBlock: TransformBlocks<EmbedBlockGQL>,
): Promise<TransformEmbedBlockResult> => {
  const { caption, className, providerNameSlug, url } = embedBlock.attributes;
  try {
    let html: stringOrNull = null;

    if (providerNameSlug === "youtube") {
      const response = await fetch(`https://www.youtube.com/oembed?url=${url}`);
      if (response.status === 200) {
        const data: YoutubeResponseOembed = await response.json();
        html = data.html;
      }
    }

    const cn = className.split(" ")[0].split("-");
    const aspectRatio = `${cn[3] || 16}-${cn[4] || 9}`;

    return {
      block: {
        name: embedBlock.name,
        attributes: {
          html,
          aspectRatio,
          url,
          caption,
        },
      },
      video: { id: url.slice(-4), href: url },
    };
  } catch (error) {
    return {
      block: {
        name: `error: ${embedBlock.name}`,
        attributes: null,
        innerBlocks: null,
        message: JSON.stringify(error),
      },
      video: null,
    };
  }
};
