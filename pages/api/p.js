import { gql } from "@apollo/client";

import { client } from "../../store/apollo-client";

const p = async (req, res) => {
  const { WORDPRESS_AUTH_REFRESH_TOKEN, GRAPHQL_JWT_AUTH_SECRET_KEY } =
    process.env;

  if (req.query.secret !== GRAPHQL_JWT_AUTH_SECRET_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { data: token } = await client.mutate({
    mutation: gql`
      mutation refreshAuthToken($token: String!) {
        __typename
        refreshJwtAuthToken(input: { jwtRefreshToken: $token }) {
          authToken
        }
      }
    `,
    variables: { token: WORDPRESS_AUTH_REFRESH_TOKEN },
  });

  // res.json({ token: token.refreshJwtAuthToken.authToken });
  return res.json({ token: token.refreshJwtAuthToken.authToken });
  // res.redirect(`/preview?id=${req.query.id}&preview=true`);

  // res.end("Preview mode enabled");
};

export default p;

// const response = await fetch(
//   `http://192.168.1.88/wp-json/wp/v2/posts/${req.query.id}?_wpnonce=${req.query.preview_nonce}&_fields=slug`,
//   { credentials: "include" } // required for cookie nonce auth
// );

// const result = await response.json();

// mutation refreshJwtAuthToken($token: String!) {
//         __typename
//         refreshJwtAuthToken(input: { jwtRefreshToken: $token }) {
//           authToken
//         }
// }

// const response = await fetch(
//   `http://192.168.1.88/wp-json/wp/v2/posts/${req.query.id}?_fields=slug`,
//   {
//     headers: {
//       "X-WP-Nonce": req.query.preview_nonce,
//     },
//   }
// );

// if (!response.ok) {
//   console.log(response);
//   return res
//     .status(401)
//     .json({ message: `error: ${response.status} | ${response.statusText}` });
// }

// const post = await response.json();
