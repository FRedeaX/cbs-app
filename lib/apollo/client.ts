import { ApolloClient, createHttpLink } from "@apollo/client";

import { cache } from "./cache";

const uri = process.env.NEXT_PUBLIC_API_APOLLO;

const link = createHttpLink({
  uri,
});

export const client = new ApolloClient({
  cache,
  link,
});
