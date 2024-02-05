/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/articles',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/articles',
        basePath: false,
        permanent: false
      },
    ]
  },
};

export default nextConfig;
