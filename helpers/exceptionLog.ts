/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */
import { captureException } from "@sentry/nextjs";

export const exceptionLog = (error: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  } else {
    captureException(error);
  }
};
