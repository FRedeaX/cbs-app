import { FC, Suspense } from "react";

import { Defaultize } from "@/helpers/typings/utility-types";
import { Article, ArticleProps } from "@/components/Article/Article";
import { Offer } from "@/components/Offer";

import classes from "./Route.Post.module.css";

type PostProps = Defaultize<ArticleProps, "categories"> & { id?: string };

export const RoutePost: FC<PostProps> = ({
  id,
  href,
  title,
  imageUrl,
  blocks,
  categories,
  isPreview,
}) => (
  <div className={classes.root}>
    <Article
      title={title}
      categories={categories}
      blocks={blocks}
      isPreview={isPreview}
      href={href}
      imageUrl={imageUrl}
    />

    {id && (
      <Suspense>
        <Offer id={id} categories={categories.map((c) => c.name)} />
      </Suspense>
    )}
  </div>
);
