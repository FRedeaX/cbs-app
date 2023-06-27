import { gql } from "@apollo/client";

import { Nullable } from "@/helpers/typings/utility-types";

type Venue = {
  name: string;
  description: Nullable<string>;
  slug: string;
};

type PosterItemGQL = {
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
    dataend: Nullable<string>;
    time: Nullable<string>;
  };
  formOfEvent: {
    value: "offline" | "online";
  };
};

export type PosterGQL = {
  posters: { nodes: PosterItemGQL[] };
};

const posterItemGQL = {
  fragments: gql`
    fragment posterItem on Poster {
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
        dataend
        time
      }
      formOfEvent {
        value
      }
    }
  `,
};

export const FETCH_POSTER = gql`
  query FetchPoster {
    posters(first: 50) {
      nodes {
        ...posterItem
      }
    }
  }
  ${posterItemGQL.fragments}
`;
