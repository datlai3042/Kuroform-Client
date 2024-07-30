/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: false,
      env: {
            BACK_END_URL: process.env.NEXT_PUBLIC_BACK_END_URL,
            CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
      },
      images: {
            remotePatterns: [
                  {
                        protocol: "https",
                        hostname: "res.cloudinary.com",
                        port: "",
                        pathname: "/cloud304/image/**",
                  },
                  {
                        protocol: "https",
                        hostname: "lh3.googleusercontent.com",
                        port: "",
                  },
                  {
                        protocol: "https",
                        hostname: "avatars.githubusercontent.com",
                        port: "",
                  },
            ],
      },
      experimental: {
            missingSuspenseWithCSRBailout: false,
          },
      // reactStrictMode: false,
};

export default nextConfig;
