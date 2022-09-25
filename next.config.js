const assetPrefix = process.env.CDN_ASSET_PREFIX || '';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['images.ctfassets.net', 'via.placeholder.com'],
  },
  compress: true,
  assetPrefix,
  experimental: {
    // https://github.com/vercel/next.js/issues/30482
    // https://github.com/vercel/next.js/issues/30330
    esmExternals: false,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
};

module.exports = withBundleAnalyzer(nextConfig);
