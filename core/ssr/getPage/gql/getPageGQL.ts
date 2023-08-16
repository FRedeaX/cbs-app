import { QueryOptions, gql } from "@apollo/client";
import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { client } from "@/lib/apollo/client";
import { TransformBlocks } from "@/core/backend/transformBlocks/utils/type";
import { FetcherGQLData, fetcherGQLData } from "@/helpers/fetcherGQLData";
import { Nullable } from "@/helpers/typings/utility-types";
import { columnsBlockGQL } from "@/components/blocks/Columns/utils/columnsGQL";
import { embedBlockGQL } from "@/components/blocks/Embed/utils/embedGQL";
import { fileBlockGQL } from "@/components/blocks/File/utils/fileGQL";
import { galleryBlockGQL } from "@/components/blocks/Gallery/utils/galleryGQL";
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
import { REVALIDATE } from "@/constants";

type GetPageQueryVariables = {
  id: string | number;
  idType: "DATABASE_ID" | "ID" | "SLUG" | "URI";
  isPreview?: boolean;
  cursor?: string;
  first?: number;
};

type PageFieldsGQL = {
  id: string;
  title: string;
  excerpt: string;
  template: {
    templateName: "Default" | "Library" | "Redirect";
  };
};

type PageSareComponentsFieldsGQL = {
  link: string;
};

type Image = {
  node: {
    databaseId: number;
    sourceUrl: string;
  };
};

type ChildrenPageFieldsGQL = {
  uri: string;
  featuredImage: Nullable<Image>;
};

type GetPageQuery = {
  page: Nullable<
    PageFieldsGQL &
      PageSareComponentsFieldsGQL & {
        blocks: TransformBlocks[];
        children: {
          nodes: (PageFieldsGQL & ChildrenPageFieldsGQL)[];
          pageInfo: {
            endCursor: string;
          };
        };
      }
  >;
};

const pageFieldsGQL = {
  fragments: gql`
    fragment pageFieldsGQL on Page {
      id
      title
      excerpt
      template {
        templateName
      }
    }
  `,
};

const pageSareComponentsFieldsGQL = {
  fragments: gql`
    fragment pageSareComponentsFieldsGQL on Page {
      link
    }
  `,
};

const getPageDocument = gql`
  query GetPageDocument(
    $id: ID!
    $idType: PageIdType
    $isPreview: Boolean
    $cursor: String
    $first: Int
  ) {
    page(id: $id, idType: $idType, asPreview: $isPreview) {
      ...pageFieldsGQL
      ...pageSareComponentsFieldsGQL
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
      children(after: $cursor, first: $first) {
        nodes {
          ... on Page {
            ...pageFieldsGQL
            uri
            featuredImage {
              node {
                databaseId
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
  ${pageFieldsGQL.fragments}
  ${pageSareComponentsFieldsGQL.fragments}
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

export const clientGetPageQuery = (
  baseOptions: Omit<QueryOptions<GetPageQueryVariables, GetPageQuery>, "query">,
) => {
  const options = { query: getPageDocument, ...baseOptions };
  return client.query<GetPageQuery, GetPageQueryVariables>(options);
};

export const useGetPageQuery = (
  variables: GetPageQueryVariables,
  config?: SWRConfiguration<
    GetPageQuery,
    Error,
    Fetcher<GetPageQuery, FetcherGQLData<GetPageQueryVariables>>
  >,
) =>
  useSWR<GetPageQuery, Error, FetcherGQLData<GetPageQueryVariables>>(
    { document: getPageDocument, variables },
    fetcherGQLData,
    { refreshInterval: REVALIDATE.PREVIEW_POLL_INTERVAL, ...config },
  );
