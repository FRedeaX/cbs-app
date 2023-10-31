import classNames from "classnames";
import { FC } from "react";

import { createMarkup } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";
import { PosterItemDate } from "@/components/poster/PosterItem/components/PosterItem.Date/PosterItem.Date";
import { Date } from "@/components/poster/PosterItem/types";

import classes from "./Poster-item.module.css";
import { PosterItemVenue } from "./components/PosterItem.Venue/PosterItem.Venue";

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
    dateStart: Date;
    dateEnd: Nullable<Date>;
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
  className?: string;
}

export const PosterItem: FC<PosterItemProps> = ({
  data: {
    posterDate,
    formOfEvent,
    title,
    content,
    excerpt,
    posterDepartments,
    posterLocations,
  },
  className,
}) => (
  <div className={classNames(classes.root, className)}>
    <div className={classes.header}>
      <PosterItemDate posterDate={posterDate} />
      {(posterDepartments.nodes[0] || posterLocations.nodes[0]) && (
        <div className={classes.venue}>
          <PosterItemVenue
            department={posterDepartments.nodes[0]}
            locations={posterLocations.nodes[0]}
          />
        </div>
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
);
