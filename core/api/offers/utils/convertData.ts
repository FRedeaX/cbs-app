import { SearchHitsNode } from "@/core/elastic/type";
import { IData } from "@/components/Widget/Card/Card";

export const convertData = (data: SearchHitsNode[]): IData[] =>
  data.map(
    ({
      _id,
      _source: { title, link, categories, departments, excerpt, thumbnail },
    }) => ({
      id: `${_id}`,
      title,
      uri: link,
      categories: {
        nodes: departments.concat(categories),
      },
      excerpt,
      featuredImage: thumbnail.url
        ? {
            node: {
              sourceUrl: thumbnail.url,
            },
          }
        : null,
    }),
  );
