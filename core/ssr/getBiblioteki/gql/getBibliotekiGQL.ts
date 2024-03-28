import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

type BibliotekiBase = {
  address: string;
  email: Nullable<string>;
  name: string;
  point: string;
  shortName: string;
  id: string;
  telefon: Nullable<string>;
};

export type BibliotekiSchedule = {
  cleanupDay: [string, string];
  friday: string;
  holiday: string;
  isHoliday: boolean;
  lunchBreak: [string, string];
  monday: string;
  saturday: string;
  sunday: string;
  thursday: string;
  tuesday: string;
  wednesday: string;
};

export type BibliotekiScheduleAup = {
  cleanupDayAup: [string, string];
  fridayAup: string;
  holidayAup: string;
  isHolidayAup: boolean;
  lunchBreakAup: [string, string];
  mondayAup: string;
  saturdayAup: string;
  sundayAup: string;
  thursdayAup: string;
  tuesdayAup: string;
  wednesdayAup: string;
};

export type BibliotekaFieldsGQL = {
  menuOrder: number;
  bibliotekiBase: BibliotekiBase;
  bibliotekiSchedule: BibliotekiSchedule;
  bibliotekiScheduleAup: BibliotekiScheduleAup;
};

type GetBibliotekiQuery = {
  page: Nullable<{
    title: string;
    excerpt: string;
    children: {
      nodes: BibliotekaFieldsGQL[];
    };
  }>;
};

export const getBibliotekiDocument = gql`
  query GetBibliotekiDocument {
    page(id: "grafik-raboty-bibliotek", idType: URI) {
      title
      excerpt
      children {
        nodes {
          ... on Page {
            menuOrder
            bibliotekiBase {
              address
              email
              name
              point
              shortName
              id
              telefon
            }
            bibliotekiSchedule {
              cleanupDay
              friday
              holiday
              isHoliday
              lunchBreak
              monday
              saturday
              sunday
              thursday
              tuesday
              wednesday
            }
            bibliotekiScheduleAup {
              cleanupDayAup
              fridayAup
              holidayAup
              isHolidayAup
              lunchBreakAup
              mondayAup
              saturdayAup
              sundayAup
              thursdayAup
              tuesdayAup
              wednesdayAup
            }
          }
        }
      }
    }
  }
`;

export const clientGetBibliotekiQuery = (
  baseOptions?: Omit<QueryOptions<never, GetBibliotekiQuery>, "query">,
) => {
  const options = { query: getBibliotekiDocument, ...baseOptions };
  return client.query<GetBibliotekiQuery>(options);
};
