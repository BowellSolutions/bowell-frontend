/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL ?? "http://127.0.0.1:8000/api",
    API_ACCESS_TOKEN_LIFETIME: process.env.API_ACCESS_TOKEN_LIFETIME ?? 60 * 60,
  },
};
