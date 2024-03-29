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

const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/lab",
  "@mui/icons-material",
  "swr",
  "graphql-request",
]);

const nextConfig = withTM({
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: [`${process.env.DOMAIN}`, "cbsbaikonur.ru"],
    formats: ["image/webp"],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // staticPageGenerationTimeout: 180,
    // images: {
    // unoptimized: true,
    // },
  },
  eslint: {
    ignoreDuringBuilds: true,
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
});

const userSentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  silent: true,
  org: "cbs-ai",
  project: "nextjs",
};

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: false,
  disableLogger: true,
};

module.exports = withSentryConfig(
  nextConfig,
  userSentryWebpackPluginOptions,
  sentryOptions,
);
