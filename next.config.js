/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const transpilePackages = ["@mui/material", "@mui/lab", "@mui/icons-material"];

const nextConfig = {
  output: "standalone",
  transpilePackages,

  // События и конфигурация не применяется к useSpring
  // Подробнее: https://github.com/pmndrs/react-spring/issues/2146#issuecomment-1743513157
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cbsbaikonur.ru",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    formats: ["image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // async redirects() {
  //   return redirect([...redirectRoutes], "/");
  // },
};

const sentryBuildOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  org: "cbs-ai",
  project: "nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: false,
  disableLogger: true,
};

module.exports = withSentryConfig(nextConfig, sentryBuildOptions);
