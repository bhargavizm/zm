
import Image from "next/image";
import MarketingData from "./marketingData";

const MarketingFeatures = () => {
  return (
    <section className="bg-mainGreen padding-lr py-20">
      <h2 className="text-white text-center font-bold text-4xl mb-3">
        Leading QR Code Marketing and Management Tools
      </h2>
      <h4 className="mb-10 text-center text-lg text-slate-400">
        A reliable QR Code solution equipped with powerful, next-gen features.
      </h4>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MarketingData && MarketingData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-6 cursor-pointer shadow-xl transition-effects border-2 border-dashed"
          >
            <div className="w-16 h-16 mx-auto mb-4 pt-4 animate-bounce">
              <Image
                src={item.image}
                alt={item.title}
                width={70}
                height={70}
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-darkGreen">
              {item.title}
            </h3>
            <p className="text-center text-gray-600 text-sm mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketingFeatures;
