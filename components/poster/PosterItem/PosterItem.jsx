import { gql } from "@apollo/client";
import classNames from "classnames";
import Link from "next/link";

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
  data: {
    posterDate: { dateStart, dateEnd },
    title,
    content,
    excerpt,
    posterDepartments,
  },
  count,
  className,
}) => (
  <div
    className={classNames(classes.block, className, {
      [classes.block_count_1]: count !== undefined && count === 1,
    })}>
    <div className={classes.header}>
      <span
        className={classNames(classes.date, {
          [classes.date_size_small]: dateEnd.day !== null,
        })}>
        {dateEnd.day !== null
          ? `${dateStart.day}-${dateEnd.day}`
          : dateStart.day}
      </span>
      <span className={classes.month}>{dateStart.monthText}</span>
      {/* <span
          className={classes.type}
          title={"Мероприятие будет проведено в онлайн-режиме на сайте ГКУ ЦБС"}
        >
          онлайн
        </span> */}
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
