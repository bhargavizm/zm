'use client';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServicesLayout from '@/components/servicesPages/servicesLayout/servicesLayout';
import CustomizeQRCode from '@/components/homePage/customizedQRCodeDesigns/customizeQRCode';
import Image from 'next/image';

const componentMap = {
  'business-cards': dynamic(() => import('@/components/servicesPages/servicesLayout/business/businessContent'), { ssr: false }),
  // 'product-cards': dynamic(() => import('@/components/servicesPages/servicesLayout/contentTabs/ProductContent'), { ssr: false }),
  // 'form-qr': dynamic(() => import('@/components/servicesPages/servicesLayout/contentTabs/FormContent'), { ssr: false }),
  // others that use ServicesLayout...
};

const directToCustomize = ['urls', 'meetings','google-meets','zoom-meets','microsoft-teams','youtube', 'facebook', 'instagram', 'linkedin', 'twitter', 'location',];
 // Slugs that directly go to CustomizeQRCode

const ServicePage = () => {
  const { slug } = useParams();
  const [ContentTabComponent, setContentTabComponent] = useState(null);

  useEffect(() => {
    if (!slug) return;

    if (directToCustomize.includes(slug)) {
      setContentTabComponent(() => () => <CustomizeQRCode />);
    } else if (componentMap[slug]) {
      setContentTabComponent(() => componentMap[slug]);
    } else {
      setContentTabComponent(() => () => (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">Service not found</h2>
          <p className="mt-2">No service found for: {slug}</p>
        </div>
      ));
    }
  }, [slug]);

if (!ContentTabComponent) {
  return (
    <div className="fixed inset-0 bg-mainGreen bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <img
          src="/images/logo.svg" // Change this to your logo path
          alt="Loading Logo"
          className="w-20 h-20 animate-pulse"
        />
        {/* Optional spinner ring */}
        {/* <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-spin" /> */}
      </div>
    </div>
  );
}




  // If it's a direct service like facebook, just render it directly
  if (directToCustomize.includes(slug)) {
    return <CustomizeQRCode />;
  }

  // Otherwise use the ServicesLayout wrapper
  return <ServicesLayout ContentTabComponent={ContentTabComponent} />;
};

export default ServicePage;
