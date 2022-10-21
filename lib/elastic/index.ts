import { ISearchParams } from "../../components/Search/Search.utils/type";
import { highlight } from "./highlight";

export const createBodyRequest = (query: ISearchParams) => {
  // eslint-disable-next-line no-underscore-dangle
  const category = query.category ? query.category.split(",") : null;

  return {
    query: {
      bool: {
        must: {
          multi_match: {
            query: query.text,
            // analyzer: "rus_eng_key_analyzer",
            fields: ["title.text", "title", "content"],
          },
        },
      },
    },
    ...(category && {
      post_filter: {
        terms: { "category.name.raw": category },
      },
    }),
    highlight,
    aggs: {
      category: {
        terms: {
          field: "category.name.raw",
          size: 50,
        },
      },
    },
    _source: ["title", "excerpt", "link", "thumbnail", "category"],
  };
};
