'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { componentMap, directToCustomize } from '../servicesRoutes/servicesRoutes';
import CustomizeQRCode from '@/components/homePage/customizedQRCodeDesigns/customizeQRCode';
import ServicesLayout from './servicesLayout';

const ServicesDataFlow = ()  =>{
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
}

export default ServicesDataFlow