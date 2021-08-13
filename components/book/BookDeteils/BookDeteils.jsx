import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Book-Deteils.module.css';

const BookDeteils = ({data, name}) => {

  const RenderItems = () => {
    // console.log(name, ' ', !!data);
    return data.map((node) => <Link className={ classes.link } key={ node.id } to={ node.uri }>{ node.name }</Link>)
  }

  return (
    <div className={ classes.body }>
      <span className={ classes.label }>{ `${name}: ` }</span>
      <span className={ classes.value }><RenderItems /></span>
    </div>
  )
}

export default BookDeteils;