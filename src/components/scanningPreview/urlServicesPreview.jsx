// "use client";
// import { useEffect } from "react";

// const UrlServicePreview = ({ data }) => {
//   console.log(data);
//   useEffect(() => {
//     if (data?.url) {
//       const newTab = window.open(data.url, "_blank", "noopener,noreferrer");
//       if (newTab) newTab.opener = null; // extra safety
//     }
//   }, [data?.url]);

//   return null;
// };

// export default UrlServicePreview;

"use client";

const UrlServicePreview = ({ data }) => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <a
        href={data?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-xl"
      >
        Open Link
      </a>
    </div>
  );
};

export default UrlServicePreview;

