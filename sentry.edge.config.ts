// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0453608349524a9b8f1f1056543c5bab@o397370.ingest.us.sentry.io/5898663",

  tracesSampleRate: 1,

  debug: false,
  enabled: false,
});
