import React from 'react';
import Layout from '../../UI/Layout/Layout';
import BookDeteils from '../BookDeteils/BookDeteils';
import Content from './../../Content/Content';
import Seo from './../../Seo/Seo';
import BookImage from './../BookImage/BookImage';
import classes from './BookPage.module.css';

//{data, data: {bookAuthors, featuredImage, title}}
const BookPage = ({data: { bookAuthors, bookGenres, bookPublishers, bookYears, content, excerpt ,featuredImage, title }}) => {
  // const { bookAuthors, bookGenres, bookPublishers, bookYears, content, excerpt,featuredImage, id, title } = dataBook ? dataBook : data.book;
  // const {   } = data.book;
  // console.log(featuredImage);

  // console.log('data:', data);
  // console.log('book:', data.book);
  
  return (
    <Layout>
      {title && <Seo title={ title } excerpt={ excerpt && excerpt } /> }
      {/* {console.log('---------------', !!bookAuthors.nodes) } */}
      <div className={ classes.body }>
        <div className={classes.aside}>
          {featuredImage &&
            <div className={classes["image-wrapper"]}>        
              <BookImage
              width={ featuredImage.node.mediaDetails.width }
              height={ featuredImage.node.mediaDetails.height }
              src={ featuredImage.node.sourceUrl }
              srcSet={ featuredImage.node.srcSet }
              alt={ `Книга «${title}» – ${bookAuthors.nodes[0] && bookAuthors.nodes[0].name}` }
              cover={ true }
              cls={ 'skip' }
              />
            </div>
          }
          <div className={classes.deteils}>
            { bookAuthors.nodes[0] && <BookDeteils data={ bookAuthors.nodes } name={ "Автор" }/>}
            { bookGenres && bookGenres.nodes.length && <BookDeteils data={ bookGenres.nodes } name={ "Жанр" }/>}
            { bookPublishers && bookPublishers.nodes[0] && <BookDeteils data={ bookPublishers.nodes } name={ "Издательство" }/>}
            { bookYears && bookYears.nodes[0] && <BookDeteils data={ bookYears.nodes } name={ "Год" }/>}
          </div>
        </div>
        <div className={classes.container}>
          <h1 className={classes.title}>{ title }</h1>
          <div className={classes.deteils}>
            { bookAuthors.nodes[0] && <BookDeteils data={ bookAuthors.nodes } name={ "Автор" }/>}
            { bookGenres && bookGenres.nodes.length && <BookDeteils data={ bookGenres.nodes } name={ "Жанр" }/>}
            { bookPublishers && bookPublishers.nodes[0] && <BookDeteils data={ bookPublishers.nodes } name={ "Издательство" }/>}
            { bookYears && bookYears.nodes[0] && <BookDeteils data={ bookYears.nodes } name={ "Год" }/>}
          </div>
          <div className={classes.content}>
            { content && <Content>{ content }</Content> }
          </div>
        </div>
      </div>
    </Layout>
  )
}



export default (BookPage)