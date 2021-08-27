import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import Button from "../../../UI/Button/Button";
import { Icon } from "../../../UI/Icon/Icon";
import classes from "./Pagination.module.css";

const Pagination = ({ pages, paginationOffset = 2, paginationURI }) => {
  const {
    query: { page: _page },
  } = useRouter();
  const page = _page * 1;

  const prevPage =
    _page !== undefined
      ? page - paginationOffset < 1
        ? 1
        : page - paginationOffset
      : 1;
  const nextPage =
    _page !== undefined
      ? page + paginationOffset > pages
        ? pages
        : page + paginationOffset
      : paginationOffset + 4;

  return (
    <div className={classNames(classes.block, classes.root)}>
      {prevPage > 1 && (
        <Link href={`${paginationURI}/page/1`} passHref>
          <Button
            view="link"
            theme="gray"
            className={classes.link}
            title="Перейти к первой странице"
          >
            <Icon
              type="double-arrow"
              size="xs"
              side="cenert"
              direction="left"
              className={classes.icon}
            />
          </Button>
        </Link>
      )}
      {/* <PaginationButtons
        prevPage={prevPage}
        nextPage={nextPage}
        countPage={pages}
        page={page}
        _page={_page}
        paginationURI={paginationURI}
        className={classes}
      /> */}
      {Array(pages)
        .fill()
        .map((_, index) => {
          if (!(prevPage <= ++index && index <= nextPage)) return null;
          const number = index++;
          const active =
            page === number || (_page === undefined && number === 1);
          return (
            <Link
              key={`p${number}`}
              href={`${paginationURI}/page/${number}`}
              passHref
            >
              <Button
                view="link"
                theme="gray"
                checked={active}
                disable={active}
                className={classes.link}
              >
                {number}
              </Button>
            </Link>
          );
        })}
      {nextPage < pages && (
        <Link href={`${paginationURI}/page/${pages}`} passHref>
          <Button
            view="link"
            theme="gray"
            className={classes.link}
            title="Перейти к последней странице"
          >
            <Icon
              type="double-arrow"
              size="xs"
              side="cenert"
              direction="right"
              className={classes.icon}
            />
          </Button>
        </Link>
      )}
    </div>
  );
};
export default memo(Pagination);

// let T0 =
//   (0.1849999971454963 +
//     0.5450000026030466 +
//     0.07000000914558768 +
//     0.050000002374872565 +
//     0.0450000079581514 +
//     0.05499999679159373 +
//     0.059999991208314896) /
//   7;

// let T1 =
//   (0.1900000061141327 +
//     0.12499999138526618 +
//     0.11500000255182385 +
//     0.13499999477062374 +
//     0.05499999679159373 +
//     0.21000001288484782 +
//     0.09000000136438757) /
//   7;

// let T2 =
//   (0.19500000053085387 +
//     0.10000000474974513 +
//     0.06500000017695129 +
//     0.09499999578110874 +
//     0.1049999991664663 +
//     0.05499999679159373 +
//     0.04499999340623617) /
//   7;

// console.log({ "T0: ": T0, "T1: ": T1, "T2: ": T2 });

// "T0: ": 0.14428571531815187
// "T1: ": 0.13142857226609653
// "T2: ": 0.09428571294327932
