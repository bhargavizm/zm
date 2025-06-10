import useServicesContext from "@/components/hooks/useServiceContext";
import React from "react";

const ProductReview = () => {
  const { productData, productImage, } = useServicesContext();
  return (
    <>
      <section>
        <div className="flex justify-center items-start">
          <div
            className="relative w-[300px] h-[500px] bg-white border-4 border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundImage: productData.selectedTemplate
                ? `url(/templates/template${productData.selectedTemplate}.png)`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-4 flex flex-col items-center space-y-4 bg-white bg-opacity-80 p-4 rounded-lg overflow-auto">
              {productImage && (
                <Image
                  src={productImage}
                  alt="Product Preview"
                  width={360}
                  height={360}
                  className="rounded-md object-cover"
                />
              )}
              <h2 className="text-xl font-bold text-center">
                {productData.heading}
              </h2>
              <p className="text-sm text-gray-700">{productData.description}</p>

              {productData.pageUrl && (
                <a
                  href={productData.pageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 underline"
                >
                  🔗 Product Page
                </a>
              )}
              {productData.videoUrl && (
                <a
                  href={productData.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 underline"
                >
                  🎥 Product Video
                </a>
              )}

              <p className="text-sm text-gray-800">📧 {productData.email}</p>
              <p className="text-sm text-gray-800">📞 {productData.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductReview;
