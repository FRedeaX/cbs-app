import { Typography } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { CarouselRoot } from "../../../Carousel/CarouselRoot";
import { Card, IData } from "../Card";

import classes from "./Group-cards.module.css";

type GroupCardsProps = {
  data: IData[];
  title?: string;
  description?: string;
  /**
   * @default false
   */
  isClamp?: boolean;
  /**
   * @default false
   */
  isImagePriority: boolean;
};

export const GroupCards: FC<GroupCardsProps> = ({
  data,
  title,
  description,
  isClamp = false,
  isImagePriority = false,
}) => {
  const { length } = data;

  return (
    <div className={classes.container}>
      {(title || description) && (
        <div className={classes.head}>
          {title && (
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="caption" className={classes.description}>
              {description}
            </Typography>
          )}
        </div>
      )}
      <CarouselRoot
        itemMargin={5}
        className={classNames({
          [classes[`count_${length}`]]: length < 4,
        })}>
        {data.map((post, index) => (
          <Card
            key={post.id}
            data={post}
            isClamp={isClamp}
            className={classNames(classes.article, {
              [classes.article_size_l]: length === 2,
            })}
            imagePriority={isImagePriority && index < 3}
          />
        ))}
      </CarouselRoot>
    </div>
  );
};
