/* eslint-disable @typescript-eslint/no-var-requires */
import type { NextConfig } from "next";
import { withSentryConfig as withSentry } from "@sentry/nextjs";
const { withPigment } = require("@pigment-css/nextjs-plugin");

const transpilePackages = ["@mui/material", "@mui/lab", "@mui/icons-material"];

const nextConfig: NextConfig = {
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

/** @type {import('@pigment-css/nextjs-plugin').PigmentOptions} */
const pigmentConfig = {
  transformLibraries: ["@mui/material", "@mui/system"],
};

const withSentryConfig = withSentry(nextConfig, sentryBuildOptions);
const withPigmentConfig = withPigment(withSentryConfig, pigmentConfig);

export default withPigmentConfig;
