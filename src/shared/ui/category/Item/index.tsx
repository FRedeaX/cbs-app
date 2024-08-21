import { FC } from "react";
import classNames from "classnames";
import Link from "next/link";
import classes from "./Category.Item.module.css";
import { CategoryItemProps } from "../type";

type ItemProps = Pick<CategoryItemProps, "name" | "uri"> & {
  className?: string;
};

export const Item: FC<ItemProps> = ({ uri, name, className }) =>
  uri ? (
    <Link
      href={uri}
      prefetch={false}
      className={classNames(className, classes.root)}>
      <span className={classes.text}>{name}</span>
    </Link>
  ) : (
    <span
      className={classNames(className, classes.root, classes["root--cursor"])}>
      {name}
    </span>
  );
