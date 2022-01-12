const path = require("path");
// const { redirect } = require("./helpers/redirect");
// const { redirectRoutes } = require("./Router");

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  images: {
    domains: [process.env.PUBLIC_IP],
    // domains: [process.env.PUBLIC_IP_DEV],
  },
  experimental: {
    optimizeCss: true,
    // staticPageGenerationTimeout: 180,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, {}) => {
    // Alias
    config.resolve.alias["~"] = path.resolve(__dirname + "");

    // config.node = {
    //   fs: "empty",
    //   net: "empty",
    //   tls: "empty",
    // };

    return config;
  },
  // async redirects() {
  //   return redirect([...redirectRoutes], "/");
  // },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

// module.exports = {

// };

// module.exports = withTM();

// const withTM = require("next-transpile-modules");
// module.exports = withTM(["@yandex/ui"]);
