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
]);

const nextConfig = withTM({
  output: "standalone",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: [`${process.env.HOSTNAME}`],
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

  sentry: {
    hideSourceMaps: false,
  },
});

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
