import { captureException } from "@sentry/nextjs";
import * as Vibrant from "node-vibrant";

import { GET_SOURCE_THUMBNAIL_URL } from "../../../routers/Post/Post";
import { client } from "../../../store/apollo-client";

// interface IVec3 extends Array<number> {
//   0: number;
//   1: number;
//   2: number;
// }

export default async function extractColors(req, res) {
  const { ids } = req.query || null;

  if (ids !== null) {
    try {
      const colors = [];
      const promises = await client
        .query({
          query: GET_SOURCE_THUMBNAIL_URL,
          variables: { in: ids.split(",") },
        })
        .then(({ data: { mediaItems } }) => {
          const result = [];

          mediaItems.nodes.forEach((img, index) => {
            result.push(
              Vibrant.from(img.sourceUrl)
                .getPalette()
                .then((palette) => (colors[index] = palette)),
            );
          });

          return result;
        })
        .catch((err) => {
          captureException(err, "API_EXTRACT_COLORS_GET_SOURCE_THUMBNAIL_URL");
          return [];
        });

      await Promise.all(promises);
      res.status(200).json({
        data: JSON.stringify(colors),
      });
    } catch (error) {
      res.status(500).json({ message: "ERR_IDs", error });
    }
  } else res.status(500).end("query not found");
}
