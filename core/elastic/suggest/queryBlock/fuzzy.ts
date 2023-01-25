export const fuzzy = (field: string, query: string, name: string) => ({
  fuzzy: {
    [field]: {
      value: query,
      fuzziness: "auto",
      max_expansions: 50,
      prefix_length: 0,
      transpositions: true,
      _name: `fuzzy_${name}`,
    },
  },
});
