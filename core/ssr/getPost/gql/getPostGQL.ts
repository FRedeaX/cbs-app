import { gql } from "@apollo/client";

import { TransformBlocks } from "@/core/backend/transformBlocks/utils/type";
import { Nullable } from "@/helpers/typings/utility-types";
import { columnsBlockGQL } from "@/components/blocks/Columns/utils/columnsGQL";
import { embedBlockGQL } from "@/components/blocks/Embed/utils/embedGQL";
import { fileBlockGQL } from "@/components/blocks/File/utils/fileGQL";
import { galleryBlockGQL } from "@/components/blocks/Gallery/utils";
import { headingBlockGQL } from "@/components/blocks/Heading/utils/headingGQL";
import { htmlBlockGQL } from "@/components/blocks/Html/utils/htmlGQL";
import { imageBlockGQL } from "@/components/blocks/Image/utils/imageGQL";
import { listBlockGQL } from "@/components/blocks/List/utils/listGQL";
import { mediaTextBlockGQL } from "@/components/blocks/MediaText/utils/mediaTextBlockGQL";
import { paragraphBlockGQL } from "@/components/blocks/Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "@/components/blocks/Pullquote/utils/pullquoteGQL";
import { quoteBlockGQL } from "@/components/blocks/Quote/utils/quoteGQL";
import { separatorBlockGQL } from "@/components/blocks/Separator/utils/separatorGQL";
import { spacerBlockGQL } from "@/components/blocks/Spacer/utils/spacerGQL";
import { tableBlockGQL } from "@/components/blocks/Table/utils/tableGQL";
import { verseBlockGQL } from "@/components/blocks/Verse/utils/verseGQL";
import { videoBlockGQL } from "@/components/blocks/Video/utils/videoGQL";

import { PostFieldsGQL, postFieldsGQL } from "../../getPosts/gql/postListGQL";

type PostSareComponentsFieldsGQL = {
  link: string;
};

export type GetPostQuery = {
  post: Nullable<
    PostSareComponentsFieldsGQL & PostFieldsGQL & { blocks: TransformBlocks[] }
  >;
};

const postSareComponentsFieldsGQL = {
  fragments: gql`
    fragment postSareComponentsFieldsGQL on Post {
      link
    }
  `,
};

export const getPostDocument = gql`
  query GetPostDocument($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      ...postSareComponentsFieldsGQL
      ...postFieldsGQL
      blocks {
        name
        ...columnsBlockGQL
        ...embedBlockGQL
        ...fileBlockGQL
        ...galleryBlockGQL
        ...headingBlockGQL
        ...htmlBlockGQL
        ...imageBlockGQL
        ...listBlockGQL
        ...mediaTextBlockGQL
        ...paragraphBlockGQL
        ...pullquoteBlockGQL
        ...quoteBlockGQL
        ...separatorBlockGQL
        ...spacerBlockGQL
        ...tableBlockGQL
        ...verseBlockGQL
        ...videoBlockGQL
      }
    }
  }
  ${postSareComponentsFieldsGQL.fragments}
  ${postFieldsGQL.fragments}
  ${columnsBlockGQL.fragments}
  ${embedBlockGQL.fragments}
  ${fileBlockGQL.fragments}
  ${galleryBlockGQL.fragments}
  ${headingBlockGQL.fragments}
  ${htmlBlockGQL.fragments}
  ${imageBlockGQL.fragments}
  ${listBlockGQL.fragments}
  ${mediaTextBlockGQL.fragments}
  ${paragraphBlockGQL.fragments}
  ${pullquoteBlockGQL.fragments}
  ${quoteBlockGQL.fragments}
  ${separatorBlockGQL.fragments}
  ${spacerBlockGQL.fragments}
  ${tableBlockGQL.fragments}
  ${verseBlockGQL.fragments}
  ${videoBlockGQL.fragments}
`;
