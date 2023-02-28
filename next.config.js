/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.riodigitalprint.com", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
