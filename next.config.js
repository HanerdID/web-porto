/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nonaktifkan turbopack sementara karena masalah kompatibilitas dengan Tailwind 4
  experimental: {
    
  },
};

module.exports = nextConfig;
