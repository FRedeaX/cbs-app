import { gql } from "@apollo/client";

import { TransformBlocks } from "../../../../helpers/backend/transformBlocks/utils/type";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { Color, FontSize, Gradient, ListType } from "../../utils/types";

type ListItemBlockGQLAttributes = {
  content: string;

  fontSize: FontSize;
  style: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type ListItemBlockGQL<T> = {
  attributes: ListItemBlockGQLAttributes;
  innerBlocks: T[];
};

type ListBlockGQLAttributes = {
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Тип списока элементов:
   *  - true - упорядоченный список элементов
   *  - false - неупорядоченный список элементов
   */
  ordered: boolean;
  /**
   * Порядок нумерации.
   * Атрибут `reversed`.
   */
  reversed: boolean;
  /**
   * Целое число, с которого начинается отсчет элементов списка.
   * Атрибут `start`.
   */
  start: number;
  /**
   * Задает тип нумерации:
   *  - a для строчных букв
   *  - A для прописных букв
   *  - i для строчных римских цифр
   *  - I для прописных римских цифр
   *  - 1 для чисел
   *
   * Атрибут `type`.
   * */
  type: Nullable<ListType>;

  fontSize: FontSize;
  textColor: Color;
  backgroundColor: Color;
  gradient: Gradient;
  style: Nullable<string>;
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type ListBlockGQL = {
  attributes: ListBlockGQLAttributes;
  innerBlocks: TransformBlocks<ListItemBlockGQL<ListBlockGQL>>[];
};

const listBlockAttributes = {
  fragments: gql`
    fragment listBlockAttributes on CoreListBlockAttributes {
      ... on CoreListBlockAttributes {
        anchor
        backgroundColor
        className
        fontSize
        gradient
        ordered
        reversed
        start
        style
        textColor
        type
      }
    }
  `,
};

const listItemBlockAttributes = {
  fragments: gql`
    fragment listItemBlockAttributes on CoreListItemBlockAttributes {
      ... on CoreListItemBlockAttributes {
        className
        content
        fontFamily
        fontSize
        placeholder
        style
      }
    }
  `,
};

export const listBlockGQL = {
  fragments: gql`
    fragment listBlockGQL on CoreListBlock {
      ... on CoreListBlock {
        name
        attributes {
          ...listBlockAttributes
        }
        innerBlocks {
          ... on CoreListItemBlock {
            name
            attributes {
              ...listItemBlockAttributes
            }

            innerBlocks {
              ... on CoreListBlock {
                name
                attributes {
                  ...listBlockAttributes
                }
                innerBlocks {
                  ... on CoreListItemBlock {
                    name
                    attributes {
                      ...listItemBlockAttributes
                    }

                    innerBlocks {
                      ... on CoreListBlock {
                        name
                        attributes {
                          ...listBlockAttributes
                        }
                        innerBlocks {
                          ... on CoreListItemBlock {
                            name
                            attributes {
                              ...listItemBlockAttributes
                            }

                            innerBlocks {
                              ... on CoreListBlock {
                                name
                                attributes {
                                  ...listBlockAttributes
                                }
                                innerBlocks {
                                  ... on CoreListItemBlock {
                                    name
                                    attributes {
                                      ...listItemBlockAttributes
                                    }

                                    innerBlocks {
                                      ... on CoreListBlock {
                                        name
                                        attributes {
                                          ...listBlockAttributes
                                        }
                                        innerBlocks {
                                          ... on CoreListItemBlock {
                                            name
                                            attributes {
                                              ...listItemBlockAttributes
                                            }

                                            innerBlocks {
                                              ... on CoreListBlock {
                                                name
                                                attributes {
                                                  ...listBlockAttributes
                                                }
                                                innerBlocks {
                                                  ... on CoreListItemBlock {
                                                    name
                                                    attributes {
                                                      ...listItemBlockAttributes
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ${listBlockAttributes.fragments}
    ${listItemBlockAttributes.fragments}
  `,
};
