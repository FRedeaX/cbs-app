export const highlight = {
  // no_match_size
  pre_tags: ["<mark>"],
  post_tags: ["</mark>"],
  fields: {
    "title.text": {
      number_of_fragments: 0,
    },
    title: {
      number_of_fragments: 0,
      // matched_fields: ["title", "title.text"],
    },
    content: {
      number_of_fragments: 1,
      // number_of_fragments: 5,
      // order: "score",
      fragment_size: 200,
      // type: "unified",
      // type: "plain",
    },
  },
};
