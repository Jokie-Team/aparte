const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite TODOS os hosts que o Contentful usa
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "/**" },
      { protocol: "https", hostname: "assets.ctfassets.net", pathname: "/**" },
      { protocol: "https", hostname: "downloads.ctfassets.net", pathname: "/**" },
    ],
    // no dev, evita o otimizador
    ...(isDev ? { unoptimized: true } : {}),
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      { ...fileLoaderRule, test: /\.svg$/i, resourceQuery: /url/ },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
