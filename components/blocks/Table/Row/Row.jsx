import { createMarkup } from "~/helpers";

export const Row = ({ array, Tag = "td", className }) =>
  array.map((column, index) => (
    <Tag
      key={index}
      className={className}
      dangerouslySetInnerHTML={createMarkup(column.content)}
    />
  ));
