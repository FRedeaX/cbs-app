import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";

type GetMetadataQuery = {
  generalSettings: {
    description: string;
    title: string;
    url: string;
  };
};

const getMetadataDocument = gql`
  query GetMetadataDocument {
    generalSettings {
      description
      title
      url
    }
  }
`;

export const clientGetMetadataQuery = () => {
  const options: QueryOptions<never, GetMetadataQuery> = {
    query: getMetadataDocument,
  };
  return client.query<GetMetadataQuery>(options);
};
