export const match = (field: string, query: string, name: string) => ({
  match_phrase_prefix: {
    [field]: {
      query,
      _name: `match_${name}`,
    },
  },
});
