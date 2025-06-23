
'use client';

import DesignSection from '@/components/homePage/customizedQRCodeDesigns/designSection'
import React from 'react'
import DesignLayout from './designLayout'
import OfferScrolling from '@/components/scrolling/offerScrolling';

const ServicesLayout = ({ContentTabComponent, PreviewTabComponent }) => {
  return (
    <>
    <section className="bg-mainGreen xl:px-40 px-2 pt-28 pb-20">
        <div className="bg-[#35aeae] rounded-3xl mx-auto max-w-7xl shadow-2xl pb-20 px-2">
        <DesignSection/>
        <OfferScrolling/>
        <DesignLayout ContentTabComponent={ContentTabComponent} PreviewTabComponent={PreviewTabComponent} />
        </div>
    </section>
    </>
  )
}

export default ServicesLayout