/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Industry/service URLs in the content strategy use trailing slashes (e.g. /industries/construction-aec/)
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
