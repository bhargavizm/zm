
'use client';

import DesignSection from '@/components/homePage/customizedQRCodeDesigns/designSection'
import React from 'react'
import DesignLayout from './designLayout'

const ServicesLayout = () => {
  return (
    <>
    <section className="bg-mainGreen lg:px-40 pt-30 pb-20">
        <div className="bg-green-50 rounded-3xl mx-auto max-w-6xl shadow-2xl pb-20">
        <DesignSection/>
        <DesignLayout/>
        </div>
    </section>
    </>
  )
}

export default ServicesLayout