export const matchPhrasePrefix = (
  field: string,
  query: string,
  name: string,
) => ({
  match_phrase_prefix: {
    [field]: {
      query,
      _name: `match_phrase_prefix_${name}`,
    },
  },
});
