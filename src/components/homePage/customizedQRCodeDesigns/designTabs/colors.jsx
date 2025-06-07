import React from "react";

const Colors = () => {
  return (
    <>
      <section>
        <div className="flex justify-start items-center gap-6">
          <div
            className="h-[60px] w-[60px] rounded-full bg-[#008080] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#001a1a]"></div>
            <div className="h-full w-1/2 bg-[#ea4793]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#80004b] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#ffe346]"></div>
            <div className="h-full w-1/2 bg-[#ffe346]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#00800b] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#001a1a]"></div>
            <div className="h-full w-1/2 bg-[#1a0000]"></div>
          </div>

          <div
            className="h-[60px] w-[60px] rounded-full bg-[#008080] overflow-hidden flex p-[35px_0_0_0] cursor-pointer"
            //   onClick={() => setPreSetColorOptions(5)}
          >
            <div className="h-full w-1/2 bg-[#001a1a]"></div>
            <div className="h-full w-1/2 bg-[#ea4793]"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Colors;
