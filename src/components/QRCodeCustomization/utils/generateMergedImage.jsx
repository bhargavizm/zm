import { toPng } from "html-to-image";
import toast from "react-hot-toast";

export const generateMergedImage = async (previewRef) => {
  try {
    const exportWidth = 1024;
    const exportHeight = Math.round(
      (previewRef.current.offsetHeight / previewRef.current.offsetWidth) * exportWidth
    );

    const dataUrl = await toPng(previewRef.current, {
      cacheBust: true,
      backgroundColor: "white",
      width: exportWidth,
      height: exportHeight,
      style: {
        transform: `scale(${exportWidth / previewRef.current.offsetWidth})`,
        transformOrigin: "top left",
        width: `${previewRef.current.offsetWidth}px`,
        height: `${previewRef.current.offsetHeight}px`,
      },
    });

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "merged.png", { type: "image/png" });

    return file; // ✅ Return merged File
  } catch (err) {
    console.error("Image merging failed", err);
    toast.error("Image merging failed");
    return null;
  }
};
