import React from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

const DownloadButton = () => {
    return (
        <>
            <div className="pt-4 pb-2 flex justify-center border-t">
                <button
                    // onClick={handleClick}
                    className="px-6 py-2 text-xl text-white cursor-pointer font-bold rounded-lg flex items-center gap-2 bg-[linear-gradient(to_right,#008080,#001a1a)]"
                >
                    Download
                    <FaLongArrowAltDown />
                </button>
            </div>
        </>
    );
};

export default DownloadButton;