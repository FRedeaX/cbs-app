import React, { memo } from "react";

import BookItem from "../BookItem/BookItem";

const BookPreview = ({ data }) => (
  <>
    {data.map((book) => (
      <BookItem key={book.id} node={book} />
    ))}
  </>
);

export default memo(BookPreview);
