import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

type Venue = {
  name: string;
  description: Nullable<string>;
  slug: string;
};

type PosterItemFieldsGQL = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  posterDepartments: {
    nodes: Venue[];
  };
  posterLocations: {
    nodes: Venue[];
  };
  posterDate: {
    date: string;
    dateEnd: Nullable<string>;
    time: Nullable<string>;
  };
  formOfEvent: {
    value: "offline" | "online";
  };
};

export type GetPosterQuery = {
  posters: { nodes: PosterItemFieldsGQL[] };
};

const posterItemFieldsGQL = {
  fragments: gql`
    fragment posterItemFieldsGQL on Poster {
      id
      title
      excerpt
      content
      posterDepartments {
        nodes {
          name
          description
          slug
        }
      }
      posterLocations {
        nodes {
          name
          description
          slug
        }
      }
      posterDate {
        date
        dateEnd
        time
      }
      formOfEvent {
        value
      }
    }
  `,
};

const getPosterDocument = gql`
  query GetPosterDocument {
    posters(first: 50) {
      nodes {
        ...posterItemFieldsGQL
      }
    }
  }
  ${posterItemFieldsGQL.fragments}
`;

export const clientGetPosterQuery = (
  baseOptions?: Omit<QueryOptions<undefined, GetPosterQuery>, "query">,
) => {
  const options = { query: getPosterDocument, ...baseOptions };
  return client.query<GetPosterQuery>(options);
};
