import { ApolloClient, createHttpLink } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
// import { setContext } from "@apollo/client/link/context";
import { cache } from "~/store/cache";
import fetch from "node-fetch";

const link = createHttpLink({
  uri: "https://cbsbaikonur.ru/graphql",
  // credentials: "include",
});

// let authLink = null;
// const getAuthLink = (token) => {
//   // if (authLink !== null) return authLink;

//   authLink = setContext((_, { headers }) => ({
//     headers: {
//       ...headers,
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }));
//   return authLink;
// };

export const authClient = (token) => {
  // const _link = getAuthLink(token).concat(link);
  return new ApolloClient({
    cache,
    ssrMode: true,
    link, //: _link,
    fetch,
  });
};

// const errorLink = onError((e) => {
//   // if (graphQLErrors) {
//   //   client.resetStore();
//   // }
//   const { graphQLErrors } = e;
//   // console.error({
//   //   message: graphQLErrors[0].message,
//   //   locations: graphQLErrors[0].locations,
//   // });
//   //query.definitions[0].name.value
// });

export const client = new ApolloClient({
  cache,
  link,
  fetch,
  // link: ApolloLink.from([errorLink, link]),
});
