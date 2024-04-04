import { Typography } from "@mui/material";
import { FC } from "react";

import { TransformBlocks } from "@/core/backend/transformBlocks/utils/type";

import { Category, CategoryProps } from "../Posts/Category/Category";
import Share from "../Share/Share";
import Blocks from "../blocks/Blocks";

import classes from "./Article.module.css";

export type ArticleProps = {
  title: string;
  categories?: CategoryProps["data"];
  blocks: TransformBlocks[];
  /**
   * @default false
   */
  isPreview?: boolean;
  href?: string;
  imageUrl?: string;
};

export const Article: FC<ArticleProps> = ({
  title,
  categories,
  blocks,
  isPreview = false,
  href,
  imageUrl,
}) => (
  <article className={classes.container}>
    <header className={classes.header}>
      <Typography align="center" variant="h1">
        {title}
      </Typography>
      {categories && (
        <div className={classes.category}>
          <Category data={categories} className={classes["category-link"]} />
        </div>
      )}
    </header>
    <div className={classes.body}>
      <div>
        <Blocks blocks={blocks} />
      </div>
      {!isPreview && href && blocks.length > 0 && (
        <Share
          cls={classes.Share}
          clsLink={classes.link}
          title={title}
          href={href}
          image={imageUrl}
        />
      )}
    </div>
  </article>
);
