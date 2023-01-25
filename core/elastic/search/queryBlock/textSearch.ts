export const textSearch = (query: string, name: string) => ({
  multi_match: {
    query,
    fields: ["title", "content"],
    _name: `match_${name}`,
  },
});
