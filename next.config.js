/** @type {import('next').NextConfig} */
const nextConfig = {
  /* add configuration for loading images in <Image> component */
  images: {
    /** allow images from the following domain */
    domains: ['e-cdns-images.dzcdn.net'],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/search/:path*',
        // destination: 'https://api.deezer.com/search/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
