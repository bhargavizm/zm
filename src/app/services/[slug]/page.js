// // app/services/[slug]/page.js

// import ServicesLayout from '@/components/servicesPages/layouts/servicesLayout';
// import CustomizeQRCode from '@/components/homePage/customizedQRCodeDesigns/customizeQRCode';
// import componentMap from '@/components/servicesPages/servicesRoutes/servicesRoutes';

// const directToCustomize = [
//   'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
//   'form-qr', 'forms', 'student-forms', 'personal-notes',
//   'youtube', 'facebook', 'instagram', 'linkedin', 'twitter',
//   'location', 'pdf', 'landing-page', 'github'
// ];

// export default function ServicePage({ params }) {
//   const { slug } = params;

//   let ContentTabComponent = null;
//   let PreviewTabComponent = null;

//   if (directToCustomize.includes(slug)) {
//     ContentTabComponent = () => <CustomizeQRCode />;
//     PreviewTabComponent = () => null;
//   } else if (componentMap[slug]) {
//     ContentTabComponent = componentMap[slug].content;
//     PreviewTabComponent = componentMap[slug].preview;
//   } else {
//     ContentTabComponent = () => (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-bold text-red-500">Service not found</h2>
//         <p className="mt-2">No service found for: {slug}</p>
//       </div>
//     );
//     PreviewTabComponent = () => null;
//   }

//   return (
//     <ServicesLayout
//       ContentTabComponent={ContentTabComponent}
//       PreviewTabComponent={PreviewTabComponent}
//     />
//   );
// }

// ✅ Required for static export with dynamic routes
// export async function generateStaticParams() {
//   const slugs = [
//     'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
//     'form-qr', 'forms', 'student-forms', 'personal-notes',
//     'youtube', 'facebook', 'instagram', 'linkedin', 'twitter',
//     'location', 'pdf', 'landing-page', 'github',
//     ...Object.keys(componentMap)
//   ];

//   const uniqueSlugs = [...new Set(slugs)];

//   return uniqueSlugs.map(slug => ({ slug }));
// }


// app/services/[slug]/page.js

"use client";

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServicesLayout from '@/components/servicesPages/layouts/servicesLayout';
import CustomizeQRCode from '@/components/homePage/customizedQRCodeDesigns/customizeQRCode';
import componentMap from '@/components/servicesPages/servicesRoutes/servicesRoutes';

// Slugs that go directly to CustomizeQRCode
const directToCustomize = [
  'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
  'form-qr', 'forms', 'student-forms', 'personal-notes',
  'youtube', 'facebook', 'instagram', 'linkedin', 'twitter',
  'location', 'pdf', 'landing-page', 'github'
];

const ServicePage = () => {
  const { slug } = useParams();
  const [ContentTabComponent, setContentTabComponent] = useState(null);
  const [PreviewTabComponent, setPreviewTabComponent] = useState(null);

  useEffect(() => {
    if (!slug) return;

    if (directToCustomize.includes(slug)) {
      setContentTabComponent(() => () => <CustomizeQRCode />);
      setPreviewTabComponent(() => () => null);
    } else if (componentMap[slug]) {
      setContentTabComponent(() => componentMap[slug].content);
      setPreviewTabComponent(() => componentMap[slug].preview);
    } else {
      setContentTabComponent(() => () => (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">Service not found</h2>
          <p className="mt-2">No service found for: {slug}</p>
        </div>
      ));
      setPreviewTabComponent(() => () => null);
    }
  }, [slug]);

  if (!ContentTabComponent) {
    return (
      <div className="fixed inset-0 bg-mainGreen/70 bg-opacity-50 flex items-center justify-center z-50">
        <img
          src="/logos/logo.webp"
          alt="Loading Logo"
          className="w-60 h-auto animate-pulse"
        />
      </div>
    );
  }

  if (directToCustomize.includes(slug)) {
    return <CustomizeQRCode />;
  }

  return (
    <ServicesLayout
      ContentTabComponent={ContentTabComponent}
      PreviewTabComponent={PreviewTabComponent}
    />
  );
};

export default ServicePage;


// export async function generateStaticParams() {
//   const slugs = [
//     // Direct to customize
//     'urls', 'meetings', 'google-meets', 'zoom-meets', 'microsoft-teams',
//     'form-qr', 'forms', 'student-forms', 'personal-notes',
//     'youtube', 'facebook', 'instagram', 'linkedin', 'twitter',
//     'location', 'pdf', 'landing-page', 'github',

//     // Add your dynamic service slugs below (from componentMap)
//     'business-shops',
//     'restaurant-menu',
//     'digital-vcard',
//     'pet-tag',
//     'product-card',
//     'wifi-connect',
//     'sms-tag',
//     'email-card',
//     'events',
//     'feedback',
//     'custom-link'
//   ];

//   return slugs.map(slug => ({ slug }));
// }
