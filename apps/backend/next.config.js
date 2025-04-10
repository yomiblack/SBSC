// // @ts-check
// const path = require('path');
// const { composePlugins, withNx } = require('@nx/next');

// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   nx: {
//     svgr: false,
//   },
//   // Required for Vercel deployment
//   output: 'standalone',
//   webpack: (config, { isServer }) => {
//     // Add @backend-utils alias
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
//     };
//     return config;
//   },

//   rewrites: async () => [
//     {
//       source: '/api/:path*',
//       destination: '/api/:path*', // Proxy to Next.js API routes
//     },
//   ],
// };

// const plugins = [withNx];
// module.exports = composePlugins(...plugins)(nextConfig);

const nextConfig = {
  nx: { svgr: false },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backend-utils': path.resolve(__dirname, '../../libs/backend-utils'),
    };
    return config;
  },
};
