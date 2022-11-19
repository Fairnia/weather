/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  lessLoaderOptions: {
    strictMath: true,
  },
}

module.exports = withLess(nextConfig);