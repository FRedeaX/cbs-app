import { gql } from "@apollo/client";

import { HorizontalAlign } from "../../utils/types";

export type FileBlockGQLAttributes = {
  /**
   * Горизонтальное выравнивание содержимого.
   */
  align: "" | HorizontalAlign;
  /**
   * HTML-якорь.
   */
  anchor: string;
  /**
   * Отображение документа в HTML-элементе `object`.
   */
  displayPreview: boolean;
  /**
   * Высота HTML-элемента `object`.
   */
  previewHeight: number;
  /**
   * Имя файла.
   */
  fileName: string;
  /**
   * Ссылка на файл.
   */
  href: string;
  /**
   * Показать кнопку скачивания.
   */
  showDownloadButton: boolean;
  /**
   * Атрибут `target`
   */
  textLinkTarget: "" | "_blank";
  /**
   * Дополнительный класс.
   */
  className: string;
};

export type FileBlockGQL = {
  attributes: FileBlockGQLAttributes;
};

export const fileBlockGQL = {
  fragments: gql`
    fragment fileBlockGQL on CoreFileBlock {
      ... on CoreFileBlock {
        name
        attributes {
          ... on CoreFileBlockAttributes {
            align
            anchor
            className
            displayPreview
            fileName
            href
            previewHeight
            showDownloadButton
            textLinkTarget
          }
        }
      }
    }
  `,
};
