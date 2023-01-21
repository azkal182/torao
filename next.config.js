/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["15.235.11.45", "i1.wp.com", "i2.wp.com", "i0.wp.com", "i3.wp.com", "i4.wp.com", "i5.wp.com", "oploverz.co.in"],
},
  experimental:  {
    appDir: true
  }
}

module.exports = nextConfig
