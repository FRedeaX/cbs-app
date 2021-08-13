// import { gql } from "@apollo/client";
// import { client } from "~/store/apollo-client";

// export default async function handler(req, res) {
//   const { data } = await client.query({
//     query: gql`
//       query Query {
//         post(id: "21072", idType: DATABASE_ID) {
//           slug
//         }
//       }
//     `,
//     // variables: { id: params.slug, type: "SLUG", isPreview: preview },
//     fetchPolicy: "network-only",
//   });
//   // console.log("@@", data);

//   await res.status(200).json({ name: "Next.js", data });
// }
