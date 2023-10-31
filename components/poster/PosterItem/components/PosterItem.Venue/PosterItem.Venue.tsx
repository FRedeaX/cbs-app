import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Link as MUILink } from "@mui/material";
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

  return (
    <>
      {department ? (
        <Link href={`/biblioteki/?lib=${venue.slug}`} prefetch={false} passHref>
          <MUILink underline="hover" color="inherit">
            {venue.name}
          </MUILink>
        </Link>
      ) : (
        <span>{venue.name}</span>
      )}

      {venue.description && (
        <MUILink
          href={`tel:833622${venue.description.split("-").join("")}`}
          title="Cправки по телефону"
          className={classNames(classes.phone)}
          underline="hover"
          color="inherit">
          <span className={classes.icon}>
            <PhoneRoundedIcon fontSize="inherit" />
          </span>
          {venue.description}
        </MUILink>
      )}
    </>
  );
};
