/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'xxxxx.com',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
