
'use client';

import DesignSection from "@/components/QRCodeCustomization/layouts/designSection";
import DesignLayout from "./designLayout";





const ServicesLayout = ({ContentTabComponent, PreviewTabComponent }) => {
  return (
    <>
    <section className="bg-mainGreen xl:px-40 px-2 pt-28 pb-20">
        <div className="bg-[#35aeae] rounded-3xl mx-auto max-w-7xl shadow-2xl pb-20 px-2">
        <DesignSection/>
        <DesignLayout ContentTabComponent={ContentTabComponent} PreviewTabComponent={PreviewTabComponent} />
        </div>
    </section>
    </>
  )
}

export default ServicesLayout