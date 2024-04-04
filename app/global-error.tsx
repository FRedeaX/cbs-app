"use client";

import { Void } from "@/helpers/typings/utility-types";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: Void;
}) => (
  <html lang="ru">
    <body>
      <ErrorBoundary error={error} reset={reset} />
    </body>
  </html>
);

export default GlobalError;
