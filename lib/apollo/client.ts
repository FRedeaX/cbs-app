import {
  ApolloClient,
  DefaultOptions,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const uri = process.env.NEXT_PUBLIC_API_APOLLO;

const link = createHttpLink({
  uri,
});

const cache = new InMemoryCache();

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
  ssrMode: true,
});
