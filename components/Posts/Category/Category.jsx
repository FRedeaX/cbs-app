import classNames from "classnames";
import Link from "next/link";

import CarouselScroller from "../../Carousel/Carousel.Scroller/Carousel.Scroller";
import classes from "./Category.module.css";

const Category = ({ data, cls }) => {
  if (data === undefined) return null;

  return (
    <div className={classes.block}>
      <CarouselScroller>
        {data.map((term) => (
          <Link key={term.termTaxonomyId} href={term.uri} prefetch={false}>
            <a className={classNames(classes.link, cls)}>{term.name}</a>
          </Link>
        )) }
      </CarouselScroller>
    </div>
  );
};

export default Category;
