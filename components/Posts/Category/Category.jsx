import classNames from "classnames";
import Link from "next/link";

import classes from "./Category.module.css";

const Category = ({ data, cls }) => {
  if (data === undefined) return null;

  return data.nodes.map((term) => {
    if (term.name === "slider") return null;
    return (
      <Link key={term.id} href={term.uri} prefetch={false}>
        <a className={classNames(classes.link, { [cls]: cls })}>{term.name}</a>
      </Link>
    );
  });
};

export default Category;
