// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['images.unsplash.com'],
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // Enable static export
  trailingSlash: true, // ✅ Needed so routes like /about export as /about/index.html
  images: {
    unoptimized: true, // ✅ Required: disables Image Optimization (not supported in static export)
    domains: ['images.unsplash.com'], // ✅ Only needed if you're using <Image> with remote images
  },
};

export default nextConfig;
