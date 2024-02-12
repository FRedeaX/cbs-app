import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import classNames from "classnames";
import { FC } from "react";

import { Maybe, Nullable } from "@/helpers/typings/utility-types";
import { Link } from "@/components/UI/Link/Link";

import classes from "./PosterItem.Venue.module.css";

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
        <Link
          href={`/biblioteki/?lib=${venue.slug}`}
          prefetch={false}
          underline="hover"
          color="inherit">
          {venue.name}
        </Link>
      ) : (
        <span>{venue.name}</span>
      )}

      {venue.description && (
        <Link
          href={`tel:833622${venue.description.split("-").join("")}`}
          title="Cправки по телефону"
          className={classNames(classes.phone)}
          underline="hover"
          color="inherit">
          <span className={classes.icon}>
            <PhoneRoundedIcon fontSize="inherit" />
          </span>
          {venue.description}
        </Link>
      )}
    </>
  );
};
