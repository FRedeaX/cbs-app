// import { FETCH_ARTICLE } from "../../../routes/Post/Post";
// import { authClient } from "../../../lib/apollo/client";

// const loadPreview = async (query) => {
//   const { LOCAL_URL, GRAPHQL_JWT_AUTH_SECRET_KEY } = process.env;
//   const res = await fetch(
//     `${LOCAL_URL}/api/preview?secret=${GRAPHQL_JWT_AUTH_SECRET_KEY}`,
//   );
//   const result = await res.json();

//   const client = authClient(result.token);
//   const { data } = await client.query({
//     query: FETCH_ARTICLE,
//     variables: {
//       id: query.p || query.preview_id,
//       type: "DATABASE_ID",
//     },
//     fetchPolicy: "network-only",
//   });
//   return data.post;
// };

// export default loadPreview;
