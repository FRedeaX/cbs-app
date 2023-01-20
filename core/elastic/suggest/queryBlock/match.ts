export const match = (field: string, query: string, name: string) => ({
  match: {
    [field]: {
      query,
      _name: `match_${name}`,
    },
  },
});
