import gql from "@apollo/client";
import { client } from "~/store/apollo-client";

export async function postSlugByID() {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        post(id: "20552", idType: DATABASE_ID) {
          slug
        }
      }
    `,
    // variables: { id: params.slug, type: "SLUG", isPreview: preview },
    fetchPolicy: "network-only",
  });
  // console.log("@!", data);
  return data;
}
