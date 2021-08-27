import classNames from "classnames";
import React, { memo } from "react";
import { Heading } from "~/components/blocks/Heading/Heading";
import Carousel from "~/components/Carusel/Carousel";
import Card from "../Card/Card";
import classes from "./Group-cards.module.css";

const GroupCards = ({ data, title, description, length }) => {
  return (
    <div className={classes.container}>
      {/* {console.log("render GroupCards")} */}
      <div className={classes.head}>
        <Heading level="3" className={classes.title}>
          {title}
        </Heading>
        {description && (
          <span className={classes.description}>{description}</span>
        )}
      </div>
      <Carousel
        length={length}
        itemWidth={288}
        itemMargin={6}
        className={classNames({
          [classes["count_1"]]: length === 1,
          [classes["count_2"]]: length === 2,
          [classes["count_3"]]: length === 3,
        })}
        classNameControls={classes.controls}
      >
        {data.nodes.map((postByTag, index) => (
          <Card
            key={postByTag.id}
            data={postByTag}
            cls={classNames(classes.article, {
              [classes["article_size_l"]]: length === 2,
            })}
            index={index}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default memo(GroupCards);
