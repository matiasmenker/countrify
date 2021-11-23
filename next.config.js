/** @type {import('next').NextConfig} */
module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    images: {
        domains: ['flagpedia.net', 'unsplash.com', 'images.unsplash.com'],
    },
    experimental: {
        styledComponents: true,
    },
};
