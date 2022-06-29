import classNames from "classnames";
import { memo } from "react";

import { getShortID } from "../../../../helpers";
import Carusel2 from "../../../Carusel2/Carusel2";
import { Heading } from "../../../blocks/Heading/Heading";
import { Card } from "../Card";
import classes from "./Group-cards.module.css";

const GroupCards = ({
  id = "",
  data,
  title,
  description,
  length,
  isClamp = false,
}) => (
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

    <Carusel2
      length={length}
      itemWidth={288}
      itemMargin={5}
      isOffsetSides
      className={classNames({
        [classes[`count_${length}`]]: length < 4,
      })}
      id={`${id}${getShortID(data[0].id)}`}>
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
    </Carusel2>
  </div>
);

export default memo(GroupCards);
