import * as Sentry from "@sentry/nextjs";

const enabled =
  process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true"
    ? true
    : process.env.NEXT_PUBLIC_SENTRY_ENABLED !== "false";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://0453608349524a9b8f1f1056543c5bab@o397370.ingest.us.sentry.io/5898663",
      integrations: [Sentry.anrIntegration({ captureStackTrace: true })],

      tracesSampleRate: 0.3,

      debug: false,
      enabled,

      // uncomment the line below to enable Spotlight (https://spotlightjs.com)
      // spotlight: process.env.NODE_ENV === 'development',
    });
  }
}
