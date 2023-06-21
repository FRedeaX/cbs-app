import { gql } from "@apollo/client";
import classNames from "classnames";
import { FC, LegacyRef, forwardRef } from "react";

import classes from "./Poster-item.module.css";
import PosterDate from "./PosterHeader/PosterDate";
import { createMarkup } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";
import { PosterItemVenue } from "@/components/poster/PosterItem/components/PosterItem.Venue/PosterItem.Venue";

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
        time
      }
      posterLocations {
        nodes {
          name
          description
          slug
        }
      }
      formOfEvent {
        value
      }
      title
      id
    }
  `,
};

interface IDate {
  day: string | null;
  month: number | null;
  monthText: string | null;
}

export interface IPoster {
  content: string;
  excerpt: string;
  posterDepartments: {
    nodes: Array<{
      name: string;
      description: Nullable<string>;
      slug: string;
    }>;
  };
  posterLocations: {
    nodes: Array<{
      name: string;
      description: Nullable<string>;
      slug: string;
    }>;
  };
  posterDate: {
    dateStart: IDate;
    dateEnd: IDate;
    time: string | null;
  };
  formOfEvent: {
    value: "offline" | "online";
  };
  title: string;
  id: string;
}

interface PosterItemProps {
  data: IPoster;
  count: number;
  className?: string;

  /**
   * прокидываем HTML data-* атрибут
   * see Carousel.List components
   */
  "data-idx"?: string;
}

const PosterItem: FC<PosterItemProps> = forwardRef(
  (
    {
      data: {
        posterDate,
        formOfEvent,
        title,
        content,
        excerpt,
        posterDepartments,
        posterLocations,
      },
      count,
      className,
      "data-idx": dataIdx,
    },
    ref: LegacyRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className={classNames(className, classes.block, {
        [classes.block_count_1]: count !== undefined && count === 1,
      })}
      data-idx={dataIdx}>
      <div className={classes.header}>
        <PosterDate
          dateStart={posterDate.dateStart}
          dateEnd={posterDate.dateEnd}
        />
        {posterDate.time !== null && (
          <div className={classes.time}>{posterDate.time}</div>
        )}
      </div>
      <div className={classes.body}>
        <h3 className={classes.title}>{title}</h3>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={createMarkup(content)}
        />
        <div className={classes.description}>{excerpt}</div>
      </div>
      {(posterDepartments.nodes[0] || posterLocations.nodes[0]) && (
        <div className={classes.footer}>
          <PosterItemVenue
            department={posterDepartments.nodes[0]}
            locations={posterLocations.nodes[0]}
          />
        </div>
      )}
      {formOfEvent.value === "online" && (
        <span
          className={classes.type}
          title="Мероприятие будет проведено в онлайн-режиме на сайте ГКУ ЦБС">
          онлайн
        </span>
      )}
    </div>
  ),
);

PosterItem.displayName = "PosterItem";
export default PosterItem;
