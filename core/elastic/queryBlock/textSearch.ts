export const textSearch = (text: string) => ({
  must: {
    multi_match: {
      query: text,
      // analyzer: "rus_eng_key_analyzer",
      // analyzer: "synonym_analyzer",
      fields: ["title.text", "title", "content"],
    },
  },
});
