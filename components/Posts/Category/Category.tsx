import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

import { Scroller } from "../../Scroller/Scroller";

import classes from "./Category.module.css";

export type CategoryProps = {
  data: {
    id: string;
    uri?: string;
    name: string;
  }[];
  className?: string;
};

export const Category: FC<CategoryProps> = ({ data, className }) => (
  <div className={classes.block}>
    <Scroller>
      {data.map(({ id, uri, name }) =>
        uri ? (
          <Link
            key={id}
            href={uri}
            prefetch={false}
            className={classNames(className, classes.link)}>
            <span className={classes.text}>{name}</span>
          </Link>
        ) : (
          <span
            key={id}
            className={classNames(
              classes.link,
              classes["link--cursor"],
              className,
            )}>
            {name}
          </span>
        ),
      )}
    </Scroller>
  </div>
);
