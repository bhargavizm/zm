// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['images.unsplash.com'],
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ Required for static export
    domains: ['images.unsplash.com'], // Optional if still loading from Unsplash
  },
};

export default nextConfig;
