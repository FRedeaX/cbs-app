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
  data: { posterDate, title, content, excerpt, posterDepartments },
  className,
}) => {
  const date = posterDate.date.split("/");
  const dayEnd = posterDate.dataend?.split("/")[0];

  return (
    <div className={classNames(classes.wrapper, className)}>
      <div className={classes.header}>
        <span
          className={classNames(classes.date, {
            [classes["date_size_small"]]: dayEnd,
          })}
        >
          {dayEnd ? `${date[0]}-${dayEnd}` : date[0]}
        </span>
        <span className={classes.month}>{getStringMonth(date[1])}</span>
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
            prefetch={false}
          >
            <a className={classes.link}>{posterDepartments.nodes[0].name}</a>
          </Link>
          {/* <Link
          > */}
          <a
            href={`tel:833622${posterDepartments.nodes[0].description
              .split("-")
              .join("")}`}
            className={classNames(classes.info, classes.link)}
            title={"Cправки по телефону"}
          >
            {posterDepartments.nodes[0].description}
          </a>
          {/* </Link> */}
        </div>
      )}
    </div>
  );
};

export default PosterItem;

const getStringMonth = (month) => {
  switch (month) {
    case "01":
      return "Января";
    case "02":
      return "Феваля";
    case "03":
      return "Марта";
    case "04":
      return "Апреля";
    case "05":
      return "Мая";
    case "06":
      return "Июня";
    case "07":
      return "Июля";
    case "08":
      return "Августа";
    case "09":
      return "Сентября";
    case "10":
      return "Октября";
    case "11":
      return "Ноября";
    case "12":
      return "Декабря";
    default:
      break;
  }
};
