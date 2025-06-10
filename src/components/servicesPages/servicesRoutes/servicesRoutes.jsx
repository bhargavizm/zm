
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
    preview: dynamic(() => import('@/components/servicesPages/servicesContent/product/productReview'), { ssr: false }),
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

};

export default componentMap