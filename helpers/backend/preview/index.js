import { FETCH_ARTICLE } from "~/components/Pages/Post/Post";
import { authClient } from "~/store/apollo-client";

export const loadPreview = async (query) => {
  const { LOCAL_URL, GRAPHQL_JWT_AUTH_SECRET_KEY } = process.env;
  const res = await fetch(
    `${LOCAL_URL}/api/preview?secret=${GRAPHQL_JWT_AUTH_SECRET_KEY}`
  );
  const result = await res.json();

  const _c = authClient(result.token);
  const { data } = await _c.query({
    query: FETCH_ARTICLE,
    variables: {
      id: query.p || query.preview_id,
      type: "DATABASE_ID",
    },
    fetchPolicy: "network-only",
  });
  return data.post;
};
