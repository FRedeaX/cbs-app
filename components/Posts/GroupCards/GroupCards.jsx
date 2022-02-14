import classNames from "classnames";
import { memo } from "react";

import Carousel from "../../Carusel/Carousel";
import { Heading } from "../../blocks/Heading/Heading";
import Card from "../Card/Card";
import classes from "./Group-cards.module.css";

const GroupCards = ({ data, title, description, length, isClamp = false }) => (
  <div className={classes.container}>
    {/* {console.log("render GroupCards")} */}
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
    <Carousel
      length={length}
      itemWidth={288}
      itemMargin={5}
      className={classNames({
        [classes.count_1]: length === 1,
        [classes.count_2]: length === 2,
        [classes.count_3]: length === 3,
      })}>
      {data.map((post, index) => (
        <Card
          key={post.id}
          data={post}
          isClamp={isClamp}
          cls={classNames(classes.article, {
            [classes.article_size_l]: length === 2,
          })}
          index={index}
        />
      ))}
    </Carousel>
  </div>
);

export default memo(GroupCards);
