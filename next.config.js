/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const alias = {
  // "@mui/base": "@mui/base/legacy",
  "@mui/lab": "@mui/lab/legacy",
  "@mui/material": "@mui/material/legacy",
  // "@mui/styled-engine": "@mui/styled-engine/legacy",
  "@mui/system": "@mui/system/legacy",
};

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
  silent: true,
  org: "cbs-ai",
  project: "nextjs",

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: false,
  disableLogger: true,
};

module.exports = withSentryConfig(nextConfig, sentryBuildOptions);
