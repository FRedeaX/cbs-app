const mapping = {
  settings: {
    analysis: {
      filter: {
        ru_stop: {
          type: "stop",
          stopwords: "_russian_",
        },
        ru_stemmer: {
          type: "stemmer",
          language: "russian",
        },
      },
      analyzer: {
        wp_txt: {
          tokenizer: "standard",
          filter: ["lowercase", "ru_stop", "ru_stemmer"],
        },
        wp_html: {
          char_filter: ["html_strip"],
          tokenizer: "standard",
          filter: ["lowercase", "ru_stop", "ru_stemmer"],
        },
      },
    },
  },
  mappings: {
    properties: {
      content: {
        type: "text",
        analyzer: "wp_html",
      },
      title: {
        type: "text",
        analyzer: "wp_txt",
      },
      excerpt: {
        type: "text",
        analyzer: "wp_txt",
      },
      link: {
        type: "keyword",
        index: false,
      },
      thumbnail: {
        type: "object",
        properties: {
          url: {
            type: "long",
            index: false,
          },
        },
      },
    },
  },
};

export const createMapping = () => {};

export const setMapping = () => {};
