import { gql } from "@apollo/client";

import { Nullable } from "../../../helpers/typings/utility-types";

export type getSourceThumbnailUrlData = {
  mediaItem: Nullable<{
    sourceUrl: string;
  }>;
};

export const GET_SOURCE_THUMBNAIL_URL = gql`
  query GET_SOURCE_THUMBNAIL_URL($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      sourceUrl(size: THUMBNAIL)
    }
  }
`;
