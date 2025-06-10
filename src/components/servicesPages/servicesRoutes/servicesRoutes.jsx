
'use client';

import dynamic from 'next/dynamic';

const componentMap = {
  'business-cards': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessPreview'), { ssr: false }),
  },
  'product-cards': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/product/ProductContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/product/productReview'), { ssr: false }),
  },
  'form-qr': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/form-qr/FormContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/form-qr/formPreview'), { ssr: false }),
  },
  'audios': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/form-qr/formPreview'), { ssr: false }),
  },
  // 'product-cards': {
  //   content: dynamic(() => import('@/components/servicesPages/servicesLayout/contentTabs/ProductContent'), { ssr: false }),
  //   preview: dynamic(() => import('@/components/servicesPages/servicesLayout/previewTabs/ProductPreview'), { ssr: false }),
  // },
  // 'form-qr': {
  //   content: dynamic(() => import('@/components/servicesPages/servicesLayout/contentTabs/FormContent'), { ssr: false }),
  //   preview: dynamic(() => import('@/components/servicesPages/servicesLayout/previewTabs/FormPreview'), { ssr: false }),
  // },
  // Add all 40 mappings like above
};

export default componentMap