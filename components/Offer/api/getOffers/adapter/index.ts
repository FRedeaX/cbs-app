import { SearchResponseFrontend } from "@/core/elastic/type";
import { PostCardItem } from "src/entities/card/Post";

type CardItem = PostCardItem & {
  id: string;
};

export const offerAdapter = (data: SearchResponseFrontend): CardItem[] =>
  data.hits.hits.flatMap(({ _id, _source }) => {
    if (!_source) return [];

    const { title, link, categories, departments, excerpt, thumbnail } =
      _source;

    return {
      id: _id.toString(),
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
    };
  });
