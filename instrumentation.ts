import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
}

// Ошибки серверных компонентов и обработчиков запросов
export const onRequestError = Sentry.captureRequestError;
