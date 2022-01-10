import { createMarkup } from "../../../../helpers";

const Row = ({ array, Tag = "td", className }) =>
  array.map((column, index) => (
    <Tag
      // eslint-disable-next-line react/no-array-index-key
      key={`${Tag}${index}`}
      className={className}
      dangerouslySetInnerHTML={createMarkup(column.content)}
    />
  ));

export default Row;
