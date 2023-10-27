import { Nullable } from "@/helpers/typings/utility-types";

type Venue = {
  name: string;
  description: Nullable<string>;
  slug: string;
};

export type EventDate = {
  day: number;
  month: number;
  monthText: string;
  year: number;
};

export type Poster = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  posterDepartments: {
    nodes: Venue[];
  };
  posterLocations: {
    nodes: Venue[];
  };
  posterDate: {
    dateStart: EventDate;
    dateEnd: Nullable<EventDate>;
    time: string | null;
  };
  formOfEvent: {
    value: "offline" | "online";
  };
};
