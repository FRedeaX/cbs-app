/* eslint-disable @typescript-eslint/no-var-requires */
const { withPigment } = require("@pigment-css/nextjs-plugin");
const { withSentryConfig: withSentry } = require("@sentry/nextjs");

const alias = {
  // "@mui/base": "@mui/base/legacy",
  "@mui/lab": "@mui/lab/legacy",
  "@mui/material": "@mui/material/legacy",
  // "@mui/styled-engine": "@mui/styled-engine/legacy",
  "@mui/system": "@mui/system/legacy",
};

const transpilePackages = ["@mui/material", "@mui/lab", "@mui/icons-material"];

/** @type {import('next').NextConfig} */
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

  experimental: {
    instrumentationHook: true,
  },

  webpack: (config, { isServer }) => {
    const newConfig = config;

    if (isServer === false) {
      newConfig.resolve.alias = { ...config.resolve.alias, ...alias };
    }

    return newConfig;
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
  transformLibraries: ["@mui/material"],
};

const withSentryConfig = withSentry(nextConfig, sentryBuildOptions);
const withPigmentConfig = withPigment(withSentryConfig, pigmentConfig);

module.exports = withPigmentConfig;
