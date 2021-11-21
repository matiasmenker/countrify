/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['flagpedia.net', 'unsplash.com', 'images.unsplash.com'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/countries',
                permanent: true,
            },
        ];
    }
};
