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
        wp_html: {
          filter: ["lowercase", "ru_stop", "ru_stemmer"],
          char_filter: ["html_strip"],
          tokenizer: "standard",
        },
        wp_txt: {
          filter: ["lowercase", "ru_stop", "ru_stemmer"],
          tokenizer: "standard",
        },
        rus_eng_key_analyzer: {
          char_filter: ["rus_eng_key"],
          token_filter: ["lowercase"],
          tokenizer: "standard",
        },
      },
      char_filter: {
        rus_eng_key: {
          type: "mapping",
          mappings: [
            "a => ф",
            "b => и",
            "c => с",
            "d => в",
            "e => у",
            "f => а",
            "g => п",
            "h => р",
            "i => ш",
            "j => о",
            "k => л",
            "l => д",
            "m => ь",
            "n => т",
            "o => щ",
            "p => з",
            "r => к",
            "s => ы",
            "t => е",
            "u => г",
            "v => м",
            "w => ц",
            "x => ч",
            "y => н",
            "z => я",
            "A => Ф",
            "B => И",
            "C => С",
            "D => В",
            "E => У",
            "F => А",
            "G => П",
            "H => Р",
            "I => Ш",
            "J => О",
            "K => Л",
            "L => Д",
            "M => Ь",
            "N => Т",
            "O => Щ",
            "P => З",
            "R => К",
            "S => Ы",
            "T => Е",
            "U => Г",
            "V => М",
            "W => Ц",
            "X => Ч",
            "Y => Н",
            "Z => Я",
            "[ => х",
            "] => ъ",
            "; => ж",
            "< => б",
            "> => ю",
          ],
        },
      },
    },
  },
  mappings: {
    properties: {
      category: {
        properties: {
          name: {
            type: "text",
            fields: {
              raw: {
                type: "keyword",
                index: false,
              },
            },
          },
          slug: {
            type: "keyword",
            index: false,
          },
        },
      },
      content: {
        type: "text",
        analyzer: "wp_html",
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
        properties: {
          url: {
            type: "keyword",
            index: false,
          },
        },
      },
      title: {
        type: "text",
        fields: {
          text: {
            type: "text",
          },
        },
        analyzer: "wp_txt",
      },
    },
  },
};

export const createMapping = () => {};

export const setMapping = () => {};
