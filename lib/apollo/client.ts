import { ApolloClient, createHttpLink } from "@apollo/client";

import { cache } from "./cache";

const uri = process.env.NEXT_PUBLIC_ORIGIN
  ? `${process.env.NEXT_PUBLIC_ORIGIN}/graphql`
  : undefined;

const link = createHttpLink({
  uri,
});

export const client = new ApolloClient({
  cache,
  link,
});
