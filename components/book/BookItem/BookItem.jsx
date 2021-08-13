import classNames from 'classnames';
import React, { memo } from "react";
import { Link } from "react-router-dom";
import BookImage from "../BookImage/BookImage";
import classes from "./Book-item.module.css";
import './style.css';

const BookItem = ({ node: { title, featuredImage, bookAuthors, id, uri } }) => {
  
  return <article className={ classNames(classes.book, "book-item__book--hover") }>
    <Link
      className={ classes.link }
      to={{
        pathname: uri,
        state: {
          // node: { title, featuredImage, bookAuthors },
          b_id: id
        },
      }}
      aria-label={ `Подробнее о книге «${title}» – ${bookAuthors.nodes[0] && bookAuthors.nodes[0].name}` } />
    <BookImage
      width={ featuredImage.node.mediaDetails.width }
      height={ featuredImage.node.mediaDetails.height }
      src={ featuredImage.node.sourceUrl }
      alt={ `Книга «${title}» – ${bookAuthors.nodes[0] && bookAuthors.nodes[0].name}` }
      cover={ true }
    />
    <div className={classNames(classes.info, "book-item__info--hover")}>
      {bookAuthors.nodes[0] && <Link className={classes.authors} to={bookAuthors.nodes[0].uri}>{bookAuthors.nodes[0].name}</Link>}
      <h3 className={classes.title}>{ title }</h3>
    </div>
  </article>
}

export default memo(BookItem);