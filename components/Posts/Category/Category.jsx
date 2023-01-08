import classNames from "classnames";
import Link from "next/link";

import { Scroller } from "../../Scroller/Scroller";
import classes from "./Category.module.css";

const Category = ({ data, cls }) => {
  if (data === undefined) return null;

  return (
    <div className={classes.block}>
      <Scroller>
        {data.map((term) =>
          term.uri ? (
            <Link key={term.termTaxonomyId} href={term.uri} prefetch={false}>
              <a className={classNames(classes.link, cls)}>
                <span className={classes.text}>{term.name}</span>
              </a>
            </Link>
          ) : (
            <span
              key={term.termTaxonomyId || term.slug}
              className={classNames(
                classes.link,
                classes["link--cursor"],
                cls,
              )}>
              {term.name}
            </span>
          ),
        )}
      </Scroller>
    </div>
  );
};

export default Category;
