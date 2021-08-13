import React, { memo } from "react";
import Carousel from "../../Carusel/Carousel";
import BookItem from "../BookItem/BookItem";

const BookPreview = ({ data }) => {
  return (
    <Carousel>
      {data.map(book => <BookItem key={book.id} node={book}/>)}
    </Carousel>
  )
};

export default memo(BookPreview);