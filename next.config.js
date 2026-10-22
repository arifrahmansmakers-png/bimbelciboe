/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['*.run.app', 'localhost:3000'],
};

module.exports = nextConfig;