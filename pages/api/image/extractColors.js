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
        .then(({ data: { mediaItems }, error }) => {
          if (error !== undefined) throw new Error(error.message);
          if (mediaItems.nodes.length === 0)
            throw new Error("mediaItems of null");

          const result = [];

          mediaItems.nodes.forEach((img, index) => {
            result.push(
              Vibrant.from(img.sourceUrl)
                .getPalette()
                .then((palette) => {
                  colors[index] = palette;
                }),
            );
          });

          return result;
        })
        .catch((err) => {
          captureException({
            ...err,
            cstMessage: "API_EXTRACT_COLORS_GET_SOURCE_THUMBNAIL_URL",
          });
          return [];
        });

      await Promise.all(promises);
      res.status(200).json({
        data: JSON.stringify(colors),
      });
    } catch (error) {
      captureException({ ...error, cstMessage: "ERR_IDs" });
      res.status(500).json({ cstMessage: "ERR_IDs", error });
    }
  } else res.status(500).end("query not found");
}
