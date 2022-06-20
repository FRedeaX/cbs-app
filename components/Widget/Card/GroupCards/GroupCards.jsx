import classNames from "classnames";
import { memo } from "react";

import { Heading } from "../../../blocks/Heading/Heading";
import Carousel2 from "../../../Carusel2/Carusel2";
import { Card } from "../Card";
import classes from "./Group-cards.module.css";

const GroupCards = ({ data, title, description, length, isClamp = false }) => (
  <div className={classes.container}>
    {(title || description) && (
      <div className={classes.head}>
        {title && (
          <Heading level="3" className={classes.title}>
            {title}
          </Heading>
        )}
        {description && (
          <span className={classes.description}>{description}</span>
        )}
      </div>
    )}
    {console.log(data[0].title)}
    <Carousel2
      length={length}
      itemWidth={288}
      itemMargin={5}
      isOffsetSides
      className={classNames({
        [classes[`count_${length}`]]: length < 4,
      })}
      forceUpdate={data[0].title}>
      {data.map((post, index) => (
        <Card
          key={post.id}
          data={post}
          isClamp={isClamp}
          className={classNames(classes.article, {
            [classes.article_size_l]: length === 2,
          })}
          imagePriority={index < 3}
        />
      ))}
    </Carousel2>
  </div>
);

export default memo(GroupCards);
