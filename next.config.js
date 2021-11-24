/** @type {import('next').NextConfig} */
module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    images: {
        domains: ['flagcdn.com', 'unsplash.com', 'images.unsplash.com'],
    },
    experimental: {
        styledComponents: true,
    },
};
