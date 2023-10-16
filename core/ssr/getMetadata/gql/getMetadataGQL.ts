import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";

type GetMetadataQuery = {
  description: string;
  title: string;
};

const getMetadataDocument = gql`
  query GetMetadataDocument {
    generalSettings {
      description
      title
    }
  }
`;

export const clientGetMetadataQuery = () => {
  const options: QueryOptions<never, GetMetadataQuery> = {
    query: getMetadataDocument,
  };
  return client.query<GetMetadataQuery>(options);
};
