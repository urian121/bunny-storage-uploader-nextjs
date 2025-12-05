/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: "/api/preview", search: "?name=*" }
    ],
  },
};

export default nextConfig;
