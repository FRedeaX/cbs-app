import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

import classes from "./PosterItem.Venue.module.css";
import { Maybe, Nullable } from "@/helpers/typings/utility-types";

type Venue = {
  name: string;
  description: Nullable<string>;
  slug: string;
};

type PosterItemVenueProps = {
  department: Maybe<Venue>;
  locations: Maybe<Venue>;
};

export const PosterItemVenue: FC<PosterItemVenueProps> = ({
  department,
  locations,
}) => {
  const venue = department || locations;

  if (venue === undefined) return null;

  if (department) {
    return (
      <>
        <Link href={`/biblioteki/?lib=${venue.slug}`} prefetch={false}>
          <a className={classes.link}>{venue.name}</a>
        </Link>
        {venue.description && (
          <a
            href={`tel:833622${venue.description.split("-").join("")}`}
            className={classNames(classes.info, classes.link)}
            title="Cправки по телефону">
            {venue.description}
          </a>
        )}
      </>
    );
  }

  return (
    <>
      <span>{venue.name}</span>
      {venue.description && (
        <a
          href={`tel:833622${venue.description.split("-").join("")}`}
          className={classNames(classes.info, classes.link)}
          title="Cправки по телефону">
          {venue.description}
        </a>
      )}
    </>
  );
};
