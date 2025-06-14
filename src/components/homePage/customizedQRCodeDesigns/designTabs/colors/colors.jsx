import React, { useState } from "react";

const Colors = () => {
  const [showFgColorPicker, setShowFgColorPicker] = useState(true);
  const [colorType, setColorType] = useState("single");
  return (
    <>
      <section>
        <div className="grid lg:grid-cols-6 grid-cols-3  pt-4 gap-7">
          <div
            className="h-[60px] w-[60px] rounded-full bg-[#008080] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#008080]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#001a1a] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#001a1a]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#00800b] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#f945c3]"></div>
            <div className="h-full w-1/2 bg-[#f945c3]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#730080] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#43f5f5]"></div>
            <div className="h-full w-1/2 bg-[#43f5f5]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#800000] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#f6f945]"></div>
            <div className="h-full w-1/2 bg-[#f6f945]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#fb4691] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#4378f5]"></div>
            <div className="h-full w-1/2 bg-[#4378f5]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#ffad4a] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#fe3fb5]"></div>
            <div className="h-full w-1/2 bg-[#fe3fb5]"></div>
          </div>
 

        {/* <div className="flex justify-start items-center pt-6 gap-10"> */}
          <div
            className="h-[60px] w-[60px] rounded-full bg-[#f78f44] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#799393]"></div>
            <div className="h-full w-1/2 bg-[#799393]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#8f6b40] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#518a6f]"></div>
            <div className="h-full w-1/2 bg-[#518a6f]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#eaff4a] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#65a9a9]"></div>
            <div className="h-full w-1/2 bg-[#65a9a9]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#7a4280] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#ddeded]"></div>
            <div className="h-full w-1/2 bg-[#ddeded]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#b3f646] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#0f191f]"></div>
            <div className="h-full w-1/2 bg-[#0f191f]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#652a55] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#aa3030]"></div>
            <div className="h-full w-1/2 bg-[#aa3030]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#7dff4a] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#fe3fb5]"></div>
            <div className="h-full w-1/2 bg-[#fe3fb5]"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Colors;
