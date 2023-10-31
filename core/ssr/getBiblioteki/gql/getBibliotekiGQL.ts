import { QueryOptions, gql } from "@apollo/client";

import { client } from "@/lib/apollo/client";
import { Nullable } from "@/helpers/typings/utility-types";

type BibliotekiBase = {
  address: string;
  email: Nullable<string>;
  name: string;
  point: string;
  shortname: string;
  id: string;
  telefon: Nullable<string>;
};

export type BibliotekiSchedule = {
  cleanupday: [string, string];
  friday: string;
  holiday: string;
  isholiday: boolean;
  lunchbreak: [string, string];
  monday: string;
  saturday: string;
  sunday: string;
  thursday: string;
  tuesday: string;
  wednesday: string;
};

export type BibliotekiScheduleAup = {
  cleanupdayaup: [string, string];
  fridayaup: string;
  holidayaup: string;
  isholidayaup: boolean;
  lunchbreakaup: [string, string];
  mondayaup: string;
  saturdayaup: string;
  sundayaup: string;
  thursdayaup: string;
  tuesdayaup: string;
  wednesdayaup: string;
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
              shortname
              id
              telefon
            }
            bibliotekiSchedule {
              cleanupday
              friday
              holiday
              isholiday
              lunchbreak
              monday
              saturday
              sunday
              thursday
              tuesday
              wednesday
            }
            bibliotekiScheduleAup {
              cleanupdayaup
              fridayaup
              holidayaup
              isholidayaup
              lunchbreakaup
              mondayaup
              saturdayaup
              sundayaup
              thursdayaup
              tuesdayaup
              wednesdayaup
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
