import { gql } from "@apollo/client";
import classNames from "classnames";
import Link from "next/link";

import PosterDate from "./PosterHeader/PosterDate";
import { createMarkup } from "../../../helpers";
import classes from "./Poster-item.module.css";

export const posterItemGQL = {
  fragments: gql`
    fragment posterItem on Poster {
      content
      excerpt
      posterDepartments {
        nodes {
          name
          description
          slug
        }
      }
      posterDate {
        date
        dataend
      }
      title
      id
    }
  `,
};

const PosterItem = ({
  data: { posterDate, title, content, excerpt, posterDepartments },
  count,
  className,
}) => (
  <div
    className={classNames(classes.block, className, {
      [classes.block_count_1]: count !== undefined && count === 1,
    })}>
    <div className={classes.header}>
      <PosterDate
        dateStart={posterDate.dateStart}
        dateEnd={posterDate.dateEnd}
      />
    </div>
    <div className={classes.body}>
      <h3 className={classes.title}>{title}</h3>
      <div
        className={classes.content}
        dangerouslySetInnerHTML={createMarkup(content)}
      />
      <div className={classes.description}>{excerpt}</div>
    </div>
    {posterDepartments.nodes[0] && (
      <div className={classes.footer}>
        <Link
          href={`/biblioteki/?lib=${posterDepartments.nodes[0].slug}`}
          prefetch={false}>
          <a className={classes.link}>{posterDepartments.nodes[0].name}</a>
        </Link>
        <a
          href={`tel:833622${posterDepartments.nodes[0].description
            .split("-")
            .join("")}`}
          className={classNames(classes.info, classes.link)}
          title="Cправки по телефону">
          {posterDepartments.nodes[0].description}
        </a>
      </div>
    )}
  </div>
);

export default PosterItem;

/* <span
  className={classes.type}
  title={"Мероприятие будет проведено в онлайн-режиме на сайте ГКУ ЦБС"}
>
  онлайн
</span> */
