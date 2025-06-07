"use client";

import Image from "next/image";
import React from "react";

const QRCodeTracking = () => {
  return (
    <>
      <section className="bg-slate-100 padding-lr py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      <div className="lg:col-span-4">
            <div className="lg:col-span-4">
  <div className="relative w-full h-96 md:h-[30rem] lg:h-[32rem]">
    <Image
      src="/images/dashboard.png"
      alt="dashboard"
      fill
      className="object-cover rounded-lg"
      sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 100px"
      priority
    />
  </div>
</div>

          </div>
          
          <div className="lg:col-span-8">
            <h2 className="text-mainGreen font-bold text-4xl mb-3 ">
              Track QR Code Performance in Offline Campaigns
            </h2>

            <h4 className="mb-5 weight text-slate-500">
              The Best Solution for Generating Thousands of QR Codes or
              eBusiness Cards
            </h4>

            <p className="text-md">
             Connect offline marketing with digital engagement. With ZM QR Code Services, you can create static QR codes that direct users from printed materials like brochures, posters, or flyers straight to your website or landing page—making the offline-to-online transition seamless.
            </p>

            <p className="text-md my-6">
              Even with static QR codes, you can still compare engagement across various campaigns. By using different static QR codes for each printed asset or distribution channel, you can monitor which materials are drawing the most attention through scan volume.
            </p>

            <p className="text-md">
            Organize your campaigns with ease using folders and labels, and gain insights by manually comparing which QR version generates more interaction—helpful for A/B testing between print formats or audience segments.
            </p>

            <p className="text-md my-6">
              Track scan volume and estimate success rates by evaluating the actions users take after scanning—like visiting your site, viewing a product, or contacting you.
            </p>

             <p className="text-md my-6">
              Start using our free Static QR Code Generator today—no sign-up required to begin creating beautiful, branded QR codes for your print campaigns.
            </p>
          </div>
          {/* <div className="lg:col-span-4 ">
           <Image src='/images/qr-code.jpg' alt="create-branded-logo" fill   className="max-w-full h-auto"/>
          </div> */}

        </div>
      </section>
    </>
  );
};

export default QRCodeTracking;
