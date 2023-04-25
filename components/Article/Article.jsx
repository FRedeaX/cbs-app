import { Typography } from "@mui/material";
import { forwardRef } from "react";

import Category from "../Posts/Category/Category";
import Share from "../Share/Share";
import Blocks from "../blocks/Blocks";
import classes from "./Article.module.css";

// eslint-disable-next-line react/display-name
const Article = forwardRef(
  ({ title, categories, blocks, isPreview, href, image }, ref) => (
    <article className={classes.container}>
      <div className={classes.header} ref={ref}>
        <Typography align="center" variant="h1">
          {title}
        </Typography>
        {categories && (
          <div className={classes.category}>
            <Category data={categories} cls={classes["category-link"]} />
          </div>
        )}
      </div>
      {blocks && (
        <div className={classes.body}>
          <div>
            <Blocks blocks={blocks} />
          </div>
          {!isPreview && href && (
            <Share
              cls={classes.Share}
              clsLink={classes.link}
              title={title}
              href={href}
              image={image}
            />
          )}
        </div>
      )}
    </article>
  ),
);

export default Article;
