import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

export type GetMinimumDataForOfferQuery = {
  post: Nullable<{
    id: string;
    categories: {
      nodes: {
        name: string;
      }[];
    };
    postsFields: {
      keywords: Nullable<string>;
    };
    date: string;
  }>;
};

export const getMinimumDataForOfferDocument = gql`
  query GetMinimumDataForOffer($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      categories {
        nodes {
          name
        }
      }
      postsFields {
        keywords
      }
      databaseId
      date
    }
  }
`;
