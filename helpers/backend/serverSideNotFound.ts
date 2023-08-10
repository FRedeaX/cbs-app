import { GetServerSidePropsResult } from "next";

export const serverSideNotFound: GetServerSidePropsResult<never> = {
  notFound: true,
};
