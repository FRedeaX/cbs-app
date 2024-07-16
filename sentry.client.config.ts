// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const enabled =
  process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true"
    ? true
    : process.env.NEXT_PUBLIC_SENTRY_ENABLED !== "false";

Sentry.init({
  dsn: "https://0453608349524a9b8f1f1056543c5bab@o397370.ingest.us.sentry.io/5898663",

  tracesSampleRate: 0.03,

  debug: false,
  enabled,
});
