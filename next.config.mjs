/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		BACK_END_URL: NEXT_PUBLIC_BACK_END_URL,
		CLIENT_END_URL: NEXT_PUBLIC_CLIENT_URL,
	},
	// reactStrictMode: false,
};

export default nextConfig;
