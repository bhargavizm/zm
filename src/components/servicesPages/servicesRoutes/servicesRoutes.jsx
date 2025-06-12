
'use client';

import dynamic from 'next/dynamic';

const componentMap = {
  'business-cards': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessPreview'), { ssr: false }),
  },
  'v-cards': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/business/businessPreview'), { ssr: false }),
  },
  
  'product-cards': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/product/ProductContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/product/productPreview'), { ssr: false }),
  },

  'audio': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioPreview'), { ssr: false }),
  },
  'videos': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/audio/audioPreview'), { ssr: false }),
  },
  'Pet-ID-tags': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/petIdTag/PetTagContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/petIdTag/petIDTagPreview'), { ssr: false }),
  },
  'gallery': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/gallery/galleryContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/gallery/galleryPreview'), { ssr: false }),
  },
  'resumes': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/resume/resumeContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/resume/resumePreview'), { ssr: false }),
  },
  'multi-urls': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/multiUrls/multiUrlContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/multiUrls/multiUrlPreview'), { ssr: false }),
  },
'menu-books': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/menuBook/menuBookContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/menuBook/menuBookPreview'), { ssr: false }),
  },
  'text-messages': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/textMessage/textMessageContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/textMessage/textMessagePreview'), { ssr: false }),
  },
  'sms': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/sms/smsContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/sms/smsPreview'), { ssr: false }),
  },
  'events': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/events/eventContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/events/eventPreview'), { ssr: false }),
  },
  'wifi': {
    content: dynamic(() => import('@/components/servicesPages/servicesContent/wifi/wifiContent'), { ssr: false }),
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/wifi/wifiPreview'), { ssr: false }),
  },
};

export default componentMap